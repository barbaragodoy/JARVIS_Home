import { cn } from "@/lib/utils";

describe("cn (class name utility)", () => {
  it("combines multiple class strings", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("merges conflicting Tailwind classes, keeping the last one", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("ignores falsy values (null, undefined, false)", () => {
    expect(cn("px-2", null, undefined, false, "py-4")).toBe("px-2 py-4");
  });

  it("returns an empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });
});
