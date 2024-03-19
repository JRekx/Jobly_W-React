
describe("App", () => {
  test("logout clears user info", () => {
    const mockSetCurrentUser = jest.fn();
    const mockSetToken = jest.fn();
    const logout = App.logout(mockSetCurrentUser, mockSetToken);

    logout();

    expect(mockSetCurrentUser).toHaveBeenCalledWith(null);
    expect(mockSetToken).toHaveBeenCalledWith(null);
  });

  test("signup handles api errors", async () => {
    const mockApiSignup = jest.fn().mockRejectedValue("Signup failed");

    const result = await App.signup(
      {
        username: "test",
        password: "password",
        firstName: "Test",
        lastName: "User",
        email: "test@test.com",
      },
      mockApiSignup
    );

    expect(result).toEqual({
      success: false,
      error: "Signup failed",
    });
  });

  test("applyToJob adds job id to applications", () => {
    const jobId = 123;
    const mockApplicationIds = new Set();
    const mockApiApply = jest.fn();

    App.applyToJob(jobId, mockApplicationIds, mockApiApply);

    expect(mockApplicationIds).toEqual(new Set([jobId]));
    expect(mockApiApply).toHaveBeenCalledWith("testUser", jobId);
  });
});
