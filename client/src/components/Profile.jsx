import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Navigate } from "react-router-dom";

function Profile({ user, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
    <Container className="my-4">
      <h1 className="mb-3">PROFILE</h1>
      {user && (
        <Stack style={{ width: "fit-content", margin: "0 auto" }} gap={1}>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold">NAME:</p>
            <p>{user.name}</p>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold">EMAIL:</p>
            <p>{user.email}</p>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold">PHONE:</p>
            <p>{user.phone}</p>
          </Stack>
        </Stack>
      )}
    </Container>
  </>
  )
}

export default Profile