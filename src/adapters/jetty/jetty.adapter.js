export const jettyAdapter = {
  toFrontend: (raw) => ({
    j_key: raw.j_key ?? raw.j_id,
    j_id: raw.j_id,
    j_name: raw.j_name,
    j_position: raw.j_position
      ? {
          type: "Point",
          coordinates: [
            raw.j_position.coordinates?.[0] ?? null, // longitude
            raw.j_position.coordinates?.[1] ?? null, // latitude
          ],
        }
      : null,

    j_province: raw.j_province,

    j_illegal: raw.j_illegal === true || raw.j_illegal === "Yes" ? true : false,
  }),
  toBackend: (jetty) => ({
    j_id: jetty.j_id ?? jetty.j_key,
    j_key: jetty.j_key,
    j_name: jetty.j_name,
    j_position: jetty.j_position
      ? {
          type: "Point",
          coordinates: [
            Number(jetty.j_position.coordinates?.[0]), // longitude
            Number(jetty.j_position.coordinates?.[1]), // latitude
          ],
        }
      : null,
    j_province: jetty.j_province,
    j_illegal: jetty.j_illegal === true || jetty.j_illegal === "Yes",
  }),
};
