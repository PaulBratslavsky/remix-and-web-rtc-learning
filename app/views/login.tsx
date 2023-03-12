import { Form, Link } from "@remix-run/react";
import InputField from "~/components/InputField";

interface LocationProps {
  location: { coords: { latitude: number; longitude: number } };
}

export default function Login({ location }: LocationProps ) {
  
  const locationData = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
  
  const coordsString = JSON.stringify(locationData);

  return (
    <section className="py-10 bg-gray-50 overflow-hidden h-screen flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="p-10 bg-white rounded-3xl">
          <div className="flex flex-wrap -m-8">
            <div className="w-full md:w-1/2 p-8">
              <div className="py-12 md:max-w-md mx-auto">
                <div className="flex flex-wrap items-center justify-between -m-2 mb-24">
                  <div className="w-auto p-2">Dev Connect</div>
                  <div className="w-auto p-2">
                    <Link
                      className="text-pink-500 hover:text-pink-600 font-bold"
                      to="#"
                    >
                      Create your account
                    </Link>
                  </div>
                </div>
                <div className="mb-10">
                  <h3 className="font-heading mb-3 text-3xl text-black font-black tracking-tight">
                    Sign In to Zanrly
                  </h3>
                  <p className="text-gray-500 font-bold">
                    Lorem ipsum dolor sit amet, to the con adipiscing. Volutpat
                    tempor to the condim entum.
                  </p>
                </div>
                <Form method="post">
                  <div className="flex flex-wrap -m-3">
                    <input
                      type="hidden"
                      name="location"
                      defaultValue={coordsString}
                    />
                    <InputField
                      required
                      label="Email Address"
                      type="email"
                      placeholder="Enter email address"
                      name="email"
                    />
                    <InputField
                      required
                      label="Password"
                      type="password"
                      placeholder="*************"
                      name="password"
                    />
                    <div className="w-full p-3">
                      <div className="flex flex-wrap items-center justify-between -m-3">
                        <div className="w-auto p-3">
                          <Link
                            className="text-pink-500 hover:text-pink-600 font-bold"
                            to="#"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-3">
                      <div className="flex flex-wrap md:justify-end -m-2">
                        <div className="w-full p-2">
                          <button
                            type="submit"
                            className="block px-8 py-3.5 text-lg text-center text-white font-bold bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:ring-pink-200 rounded-full"
                            to="#"
                          >
                            Sign In
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-3">
                      <div className="flex flex-wrap md:justify-end -m-2">
                        <div className="w-full p-2">
                          <Link
                            className="flex items-center justify-center px-8 py-3.5 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-pink-200 rounded-full"
                            to="#"
                          >
                            <img className="mr-2.5" src="" alt="" />
                            <span className="text-lg text-gray-900 text-center font-bold">
                              Sign in with Google
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-3">
                      <div className="flex flex-wrap md:justify-end -m-2"></div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8">
              <div
                className="flex flex-col justify-end py-16 px-8 text-center h-full rounded-3xl"
                style={{
                  backgroundImage: `url("https://images.pexels.com/photos/14851859/pexels-photo-14851859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
