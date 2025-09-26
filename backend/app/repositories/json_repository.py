from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List


class JsonRepository:
    def __init__(self, file_path: Path) -> None:
        self.file_path = file_path
        self.file_path.parent.mkdir(parents=True, exist_ok=True)
        if not self.file_path.exists():
            self._write_json({"users": []})

    def _read_json(self) -> Dict[str, Any]:
        try:
            with self.file_path.open("r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            # If file is malformed or empty, reset to a minimal valid structure
            data: Dict[str, Any] = {"users": []}
            self._write_json(data)
            return data

    def _write_json(self, data: Dict[str, Any]) -> None:
        temp_path = self.file_path.with_suffix(".tmp")
        with temp_path.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        temp_path.replace(self.file_path)

    # Users-specific helpers
    def read_users(self) -> List[Dict[str, Any]]:
        data = self._read_json()
        return data.get("users", [])

    def write_users(self, users: List[Dict[str, Any]]) -> None:
        data = self._read_json()
        data["users"] = users
        self._write_json(data)


