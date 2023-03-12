import { useEffect, useState } from "react";
import Login from "~/views/login";
import { initSocket } from "~/config/socket";
import { loginUser } from "~/config/socket";

import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

// TODO: HANDLE LOCATION ERRORS

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const location = formData.get("location");
  const username = formData.get("email");
  const password = formData.get("password");

  const data = {
    username,
    password,
    location: JSON.parse(location as string),
  }

  let socket =  initSocket() || null;
  console.log(socket, "socket server")

  loginUser(data, socket);

  // TODO: ADD ERROR HANDLING AND VALIDATION
  return redirect("/map");
}

export default function IndexRoute() {
  const data = useActionData<typeof action>();
  const [location, setLocation] = useState(null);
  console.log(data);

  useEffect(() => {
    const options = { enableHighAccuracy: true, Timeout: 5000 };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  function onSuccess(position) {
    setLocation(position);
  }

  function onError(error) {
    console.log(error);
  }

  if (!location) return <h1>loading</h1>

  return <Login location={location}/>;
}
