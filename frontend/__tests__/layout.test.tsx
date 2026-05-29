import { render, screen } from "@testing-library/react";
import { metadata } from "@/app/layout";

// Mock next/font/google to avoid font loading in tests
jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "inter-mock" }),
}));

// Extract the inner body content for testing without <html>/<body> nesting issues
function LayoutBody({ children }: { children: React.ReactNode }) {
  // Re-import after mock is set up
  const RootLayout =
    require("@/app/layout").default as React.ComponentType<{
      children: React.ReactNode;
    }>;

  // RootLayout renders <html><body>...</body></html>.
  // RTL wraps in <div>, so <html> inside <div> triggers a warning.
  // We suppress the warning and test the output structure.
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === "string" ? args[0] : "";
    if (msg.includes("validateDOMNesting")) return;
    originalError(...args);
  };

  const result = render(<RootLayout>{children}</RootLayout>);

  console.error = originalError;
  return result;
}

describe("RootLayout", () => {
  it("renders children content", () => {
    LayoutBody({
      children: <div data-testid="child">Test content</div>,
    });

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
});

describe("Metadata", () => {
  it("has the correct title", () => {
    expect(metadata.title).toBe("JARVIS Home");
  });

  it("has the correct description", () => {
    expect(metadata.description).toBe(
      "Sistema de automação residencial inteligente com agentes LangGraph"
    );
  });
});
