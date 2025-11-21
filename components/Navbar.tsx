"use client";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Envelope, Cart3, Person } from "react-bootstrap-icons";

export default function MainNavbar() {
  return (
    <Navbar bg="warning" expand="lg" className="px-3 sticky-top">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold">
          Danus.in
        </Navbar.Brand>

        <Nav className="ms-auto d-flex flex-row gap-4 fs-5">
          <Link href="#" className="text-dark">
            <Envelope />
          </Link>
          <Link href="#" className="text-dark">
            <Cart3 />
          </Link>
          <Link href="#" className="text-dark">
            <Person />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
