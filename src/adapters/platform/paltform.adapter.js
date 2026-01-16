export const platformAdapter = {
  // list: (apiData = []) =>
  //   apiData.map(item => ({
  //     ...item,
  //     pf_fuelcap: item.pf_fuelcap ? Number(item.pf_fuelcap) : null,
  //     pf_watercap: item.pf_watercap ? Number(item.pf_watercap) : null,
  //   })),

  // single: (data) => ({
  //   ...data,
  //   pf_fuelcap: data.pf_fuelcap ? Number(data.pf_fuelcap) : null,
  //   pf_watercap: data.pf_watercap ? Number(data.pf_watercap) : null,
  // }),
  toFrontend: (raw) => ({
    pf_key: raw.id,
    pf_name: raw.name,
    pf_type: raw.type,
    pf_squadron: raw.squadron,
    pf_status: raw.status,
    pf_co: raw.co,
    pf_fuelcap: raw.fuelcap,
    pf_watercap: raw.watercap,
    pf_info: raw.info,
  }),
  toBackend: (platform) => ({
    id: platform.pf_id,
    name: platform.pf_name,
    type: platform.pf_type,
    squadron: platform.pf_squadron,
    status: platform.pf_status,
    co: platform.pf_co,
    fuelcap: platform.pf_fuelcap,
    watercap: platform.pf_watercap,
    info: platform.pf_info,
  }),
};
