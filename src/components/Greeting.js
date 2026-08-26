function UserGreeting({ name, role = "Default User" }) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Hello, {name}! 👋</h1>
      <p>Welcome back. Your current role is: <strong>{role}</strong></p>
    </div>
  );
}
export default UserGreeting ;