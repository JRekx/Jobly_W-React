import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should return initial value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    expect(result.current[0]).toBe("initialValue");
  });

  test("should return value from localStorage", () => {
    localStorage.setItem("testKey", "storedValue");

    const { result } = renderHook(() => useLocalStorage("testKey"));

    expect(result.current[0]).toBe("storedValue");
  });

  test("should update localStorage on value change", () => {
    const { result } = renderHook(() => useLocalStorage("testKey"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(localStorage.getItem("testKey")).toBe("newValue");
  });

  test("should remove item from localStorage on null value", () => {
    localStorage.setItem("testKey", "value");

    const { result } = renderHook(() => useLocalStorage("testKey"));

    act(() => {
      result.current[1](null);
    });

    expect(localStorage.getItem("testKey")).toBeNull();
  });
});
