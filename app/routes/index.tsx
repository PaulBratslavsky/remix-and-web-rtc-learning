import { useEffect, useState } from "react";
import Login from '~/views/login';
import { initSocket } from '~/config/socket';

import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

// TODO: HANDLE LOCATION ERRORS

export async function action({ request }: ActionArgs) {

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password)
  // TODO: ADD ERROR HANDLING AND VALIDATION
  return redirect("/map")
}

export default function IndexRoute() {
  const data = useActionData<typeof action>();
  const [location, setLocation] = useState(null)
  console.log(data)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
  }, [])

  useEffect(() => {
    if (location) {
      initSocket()
    }
  }, [location])

  function onSuccess(position) {
    setLocation(position)
  }
  
  function onError(error) {
    console.log(error)
  }
  
  const options = {
    enableHighAccuracy: true,
    Timeout: 5000,
  }

console.log(location)

  return <Login />
}
