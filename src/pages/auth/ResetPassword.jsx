export default function ResetPassword() {
  return (
    <div className="form-card">
      <div className="space-y-2">
        <h1>Reset Password</h1>
        <h6>Your identity has been verified!! Set your new password</h6>
      </div>
      <form className="space-y-6">
        <div className="space-y-1">
          <input type="password" placeholder="New Password" />
        </div>
        <div className="space-y-1">
          <input type="password" placeholder="Confirm Password" />
        </div>
        <button className="form-btn">Login</button>
      </form>
    </div>
  );
}
