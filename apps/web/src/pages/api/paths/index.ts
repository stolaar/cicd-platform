type TRouteType = "private" | "public"

type TRoute = {
  name: string
  path: string
  type: TRouteType
  redirect?: string
}

export const ERoutesList: TRoute[] = [
  {
    name: "Login Page",
    path: "/login",
    type: "public",
    redirect: "/",
  },
  {
    name: "Landing page",
    path: "/",
    type: "private",
    redirect: "/login",
  },
  {
    name: "Settings Page",
    path: "/settings",
    type: "private",
    redirect: "/login",
  },
  {
    name: "Pipelines Page",
    path: "/pipelines",
    type: "private",
    redirect: "/login",
  },
]
