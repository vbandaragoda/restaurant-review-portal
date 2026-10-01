"""Shared helpers for the TasteLanka QA API/security/data test scripts.

Every call is executed against the running API and the real request/response is
written to an evidence JSON file. Nothing here fabricates results: the verdict is
computed from the actual status code and the optional check function.
"""
import csv
import datetime as dt
import json
import os
import time

import requests

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
API = os.environ.get("API", "http://localhost:8080/api/v1")
RESULTS_CSV = os.path.join(ROOT, "evidence", "api-security-results.csv")
_TOKEN_LABELS = {}


def now():
    return dt.datetime.now().astimezone().isoformat(timespec="seconds")


def label_token(label, token):
    _TOKEN_LABELS[token] = label


def _redact(obj):
    """Redact password values (test values) so evidence files hold no secrets."""
    if isinstance(obj, dict):
        out = {}
        for k, v in obj.items():
            if k.lower() == "password" and isinstance(v, str):
                out[k] = f"<redacted test password, length {len(v)}>"
            elif k == "token" and isinstance(v, str):
                out[k] = f"<JWT, {len(v)} chars>"
            else:
                out[k] = _redact(v)
        return out
    if isinstance(obj, list):
        return [_redact(x) for x in obj]
    return obj


class Runner:
    def __init__(self, suite):
        self.suite = suite
        self.rows = []

    def call(self, tid, title, category, method, path, expected, token=None, body=None, raw=None,
             headers=None, params=None, check=None, expected_text=None, fname=None, quiet=False):
        hdrs = dict(headers or {})
        if token:
            hdrs["Authorization"] = f"Bearer {token}"
        if body is not None:
            hdrs.setdefault("Content-Type", "application/json")
        url = API + path
        t0 = time.perf_counter()
        resp = requests.request(method, url, headers=hdrs, params=params,
                                data=raw if raw is not None else (json.dumps(body) if body is not None else None),
                                timeout=30)
        ms = round((time.perf_counter() - t0) * 1000, 1)
        try:
            rbody = resp.json()
        except ValueError:
            rbody = resp.text
        expected = expected if isinstance(expected, (list, tuple)) else [expected]
        status_ok = resp.status_code in expected
        check_ok, check_msg = (True, "")
        if check is not None and status_ok:
            try:
                res = check(resp, rbody)
                check_ok, check_msg = res if isinstance(res, tuple) else (bool(res), "")
            except Exception as exc:  # a failing assertion is a FAIL, not a crash
                check_ok, check_msg = False, f"check raised {type(exc).__name__}: {exc}"
        verdict = "PASS" if status_ok and check_ok else "FAIL"
        shown_headers = {k: (f"Bearer <{_TOKEN_LABELS.get(v[7:], 'token')}>" if k == "Authorization" else v)
                         for k, v in hdrs.items()}
        record = {
            "testId": tid, "title": title, "category": category, "executedAt": now(),
            "request": {"method": method, "url": resp.request.url, "headers": shown_headers,
                        "body": _redact(body) if body is not None else raw},
            "response": {"status": resp.status_code, "elapsedMs": ms,
                         "headers": {k: v for k, v in resp.headers.items()
                                     if k.lower() in ("content-type", "content-length", "location",
                                                      "access-control-allow-origin", "x-frame-options",
                                                      "x-content-type-options", "cache-control", "allow")},
                         "body": _redact(rbody)},
            "expected": expected_text or f"HTTP {'/'.join(map(str, expected))}",
            "actual": f"HTTP {resp.status_code}" + (f"; {check_msg}" if check_msg else ""),
            "verdict": verdict,
        }
        folder = os.path.join(ROOT, "evidence", category)
        os.makedirs(folder, exist_ok=True)
        name = fname or f"{tid}.json"
        with open(os.path.join(folder, name), "w", encoding="utf-8") as fh:
            json.dump(record, fh, ensure_ascii=False, indent=2)
        self.rows.append({"Test ID": tid, "Title": title, "Category": category, "Method": method,
                          "Endpoint": path, "Expected": record["expected"], "Actual": record["actual"],
                          "Verdict": verdict, "Evidence": f"evidence/{category}/{name}",
                          "Executed": record["executedAt"], "ElapsedMs": ms})
        if not quiet:
            print(f"{verdict:4} {tid:14} {method:6} {path[:60]:60} -> {resp.status_code} {check_msg[:90]}")
        return resp, rbody

    def save(self):
        exists = os.path.exists(RESULTS_CSV)
        with open(RESULTS_CSV, "a", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=list(self.rows[0].keys()))
            if not exists:
                w.writeheader()
            w.writerows(self.rows)
        p = sum(r["Verdict"] == "PASS" for r in self.rows)
        print(f"\n[{self.suite}] executed={len(self.rows)} pass={p} fail={len(self.rows) - p}")


def load_env():
    """Read testing/qa.env (export KEY=VALUE lines)."""
    env = {}
    with open(os.path.join(ROOT, "qa.env"), encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line.startswith("export "):
                k, v = line[7:].split("=", 1)
                env[k] = v.strip('"')
    return env
