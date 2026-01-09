import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

global.fetch = jest.fn();

describe("Dashboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading initially", () => {
    render(<Dashboard></Dashboard>);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders error if posts dont load", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: "Bad Request" }),
    });
    render(<Dashboard></Dashboard>);
    const errorMessage = await screen.findByText(/Failed to fetch posts./i);
    expect(errorMessage).toBeInTheDocument();
  });
});
