import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("renders the JARVIS Home title", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: /jarvis home/i })
    ).toBeInTheDocument();
  });

  it("renders the system description", () => {
    expect(
      screen.getByText(/sistema de automação residencial inteligente/i)
    ).toBeInTheDocument();
  });

  it("renders all four navigation links", () => {
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });

  it("renders navigation links with correct hrefs", () => {
    const expectedLinks = [
      { label: /dashboard/i, href: "/dashboard" },
      { label: /automações/i, href: "/automations" },
      { label: /integrações/i, href: "/integrations" },
      { label: /sessões/i, href: "/sessions" },
    ];

    expectedLinks.forEach(({ label, href }) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("renders all four status cards", () => {
    expect(screen.getByText("Dispositivos")).toBeInTheDocument();
    expect(screen.getByText("Automações Ativas")).toBeInTheDocument();
    expect(screen.getByText("Eventos Hoje")).toBeInTheDocument();
    expect(screen.getAllByText("Integrações")).toHaveLength(2);
  });

  it("renders the footer with version", () => {
    expect(screen.getByText(/jarvis home v0\.1\.0/i)).toBeInTheDocument();
  });
});
