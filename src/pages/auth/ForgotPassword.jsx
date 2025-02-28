export default function ForgotPassword() {
  return (
    <div className="form-card">
      <div className="space-y-2">
        <h1>Forgot Password</h1>
        <h6>
          Enter your email and we’ll send you a link to reset your Password
        </h6>
      </div>
      <form className="space-y-6">
        <div className="space-y-1">
          <input type="email" placeholder="Email" />
        </div>
        <button className="form-btn">Send</button>
      </form>
    </div>
  );
}
