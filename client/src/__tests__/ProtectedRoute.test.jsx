import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

global.fetch = jest.fn();

function TestComponent() {
  return <div>Protected Component</div>;
}

function LoginPage() {
  return <h1>Login Page</h1>;
}

describe.skip("ProtectedRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading initially", () => {
    fetch.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("authorized user renders children", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        user: {
          name: "Lydia";
        }
      },
    });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/protected component/i)).toBeInTheDocument();
    });
  });

  test("unauthorized user renders login", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/login page/i)).toBeInTheDocument();
    });
  });
});
