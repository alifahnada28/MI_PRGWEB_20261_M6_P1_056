"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { hitungBMI } from "@/lib/bmi";

export default function Page() {
  const params = useParams();
  const nama = decodeURIComponent(params.namalengkap).replaceAll("-", " ");

  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [hasil, setHasil] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setHasil(hitungBMI(Number.parseFloat(berat), Number.parseFloat(tinggi)));
  }

  function handleReset() {
    setBerat("");
    setTinggi("");
    setHasil(null);
  }

  return (
    <main style={{ maxWidth: 360, margin: "40px auto", padding: "0 16px" }}>
      <h1>Halo, {nama}</h1>
      <p>Silakan masukkan berat badan dan tinggi kamu!</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, marginTop: 16 }}
      >
        <label>
          <span>Berat (kg)</span>
          <input
            type="number"
            step="any"
            min="1"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: 6 }}
          />
        </label>

        <label>
          <span>Tinggi (cm)</span>
          <input
            type="number"
            step="any"
            min="1"
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: 6 }}
          />
        </label>

        <button type="submit" style={{ padding: 8 }}>
          Hitung
        </button>
        <button type="button" onClick={handleReset} style={{ padding: 8 }}>
          Reset
        </button>
      </form>

      {hasil && (
        <p style={{ marginTop: 16, color: hasil.warna }}>
          BMI kamu: <strong>{hasil.bmi}</strong> ({hasil.kategori})
        </p>
      )}

      <p style={{ marginTop: 24 }}>
        <Link
  href="/"
  style={{
    display: "block",
    marginTop: 24,
    padding: 8,
    textAlign: "center",
    textDecoration: "none",
    color: "inherit",
    border: "1px solid #767676",
    borderRadius: 4,
    background: "#efefef",
  }}
>
  Bukan kamu? Ganti nama
</Link>
      </p>
    </main>
  );
}