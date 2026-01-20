import { Route } from "react-router-dom";

const generateRoutes = (links, pagesMap) => {
  return links.flatMap((item) => {
    if (item.path && pagesMap[item.path]) {
      return (
        <Route key={item.path} path={item.path} element={pagesMap[item.path]} />
      );
    }

    if (item.children) {
      return item.children
        .filter((child) => pagesMap[child.path])
        .map((child) => (
          <Route
            key={child.path}
            path={child.path}
            element={pagesMap[child.path]}
          />
        ));
    }

    return [];
  });
};

export default generateRoutes;
