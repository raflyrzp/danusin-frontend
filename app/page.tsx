"use client";

import Image from "next/image";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [pickup, setPickup] = useState("");

  const daysList = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  // DATA JAJANAN
  const foods = [
    { id: 1, name: "Mochi Strawberry", price: 12000, day: "Senin", pickup: "Kampus A", img: "/food-1.jpg" },
    { id: 2, name: "Risol Mayo", price: 8000, day: "Selasa", pickup: "Kampus B", img: "/food-2.jpg" },
    { id: 3, name: "Dimsum Ayam", price: 15000, day: "Rabu", pickup: "Kampus A", img: "/food-3.jpg" },
    { id: 4, name: "Cireng Bumbu Rujak", price: 7000, day: "Jumat", pickup: "Kampus B", img: "/food-4.jpg" },
    { id: 5, name: "Sosis Bakar", price: 10000, day: "Sabtu", pickup: "Kampus A", img: "/food-1.jpg" },
    { id: 6, name: "Tahu Walik", price: 9000, day: "Minggu", pickup: "Kampus B", img: "/food-2.jpg" },
  ];

  // FILTER LOGIC
  const filteredFoods = foods.filter((item) => {
    const matchSearch = search.trim() === "" || item.name.toLowerCase().includes(search.toLowerCase());
    const matchDay = selectedDays.length === 0 || selectedDays.includes(item.day);
    const matchPrice = item.price <= maxPrice;
    const matchPickup = pickup === "" || item.pickup === pickup;
    return matchSearch && matchDay && matchPrice && matchPickup;
  });

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div style={{ backgroundColor: "#f4eed8", minHeight: "100vh" }}>
      <div className="container py-4">

        {/* TOP HERO WITH SEARCH */}
        <div className="p-4 rounded-4 shadow-sm bg-white mb-4">
          <div className="row align-items-center">

            {/* Left Image */}
            <div className="col-md-4">
              <div className="rounded-4 overflow-hidden">
                <Image
                  src="/food-1.jpg"
                  alt="hero food"
                  width={500}
                  height={250}
                  className="w-100"
                />
              </div>
            </div>

            {/* SEARCH */}
            <div className="col-md-8 mt-3 mt-md-0">
              <h3 className="fw-bold">Cari makanan danusan!</h3>

              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="ketik disini aja..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-warning btn-lg">Search</button>
              </div>
            </div>

          </div>
        </div>


        <div className="row">

          {/* SIDEBAR FILTER */}
          <div className="col-md-3 mb-4">
            <div
              className="bg-white rounded-4 p-3 shadow-sm"
              style={{
                position: "sticky",
                top: "20px",
              }}
            >
              <h5 className="fw-semibold mb-3">Filter</h5>

              {/* Hari */}
              <div className="mb-4">
                <p className="fw-semibold mb-2">Hari</p>
                {daysList.map((day) => (
                  <Form.Check
                    key={day}
                    type="checkbox"
                    label={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                ))}
              </div>

              {/* Range Harga */}
              <div className="mb-4">
                <p className="fw-semibold mb-2">Range Harga (max): Rp {maxPrice.toLocaleString()}</p>
                <Form.Range
                  min={5000}
                  max={20000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              {/* Lokasi Pengambilan */}
              <div className="mb-4">
                <p className="fw-semibold mb-2">Lokasi Pengambilan</p>
                <Form.Check
                  type="radio"
                  name="lokasi"
                  label="Kampus A"
                  checked={pickup === "Kampus A"}
                  onChange={() => setPickup("Kampus A")}
                />
                <Form.Check
                  type="radio"
                  name="lokasi"
                  label="Kampus B"
                  checked={pickup === "Kampus B"}
                  onChange={() => setPickup("Kampus B")}
                />
                <Form.Check
                  type="radio"
                  name="lokasi"
                  label="Semua"
                  checked={pickup === ""}
                  onChange={() => setPickup("")}
                />
              </div>
            </div>
          </div>


          {/* FOOD RESULTS */}
          <div className="col-md-9">
            <h4 className="fw-bold mb-3">Menu Jajanan</h4>

            <div className="row g-4">
              {filteredFoods.length === 0 && (
                <p className="text-muted">Tidak ada hasil...</p>
              )}

              {filteredFoods.map((item) => (
                <div className="col-md-4" key={item.id}>
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={500}
                      height={350}
                      className="card-img-top"
                    />

                    <div className="card-body">
                      <h5 className="card-title fw-bold">{item.name}</h5>
                      <p className="text-muted mb-1">{item.day}</p>
                      <p className="text-muted mb-2">{item.pickup}</p>
                      <span className="fw-bold">
                        Rp {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#4b1d00", color: "white", marginTop: "40px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <h2 style={{ margin: 0, fontStyle: "italic", fontWeight: 600 }}>
            Danus.in
          </h2>

          <div
            style={{
              display: "flex",
              gap: "30px",
              fontStyle: "italic",
              fontSize: "0.95rem",
            }}
          >
            <span>Tentang Kami</span>
            <span>Kebijakan</span>
            <span>Bantuan</span>
            <span>Hubungi Kami</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
