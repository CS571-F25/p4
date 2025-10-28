export default {
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/cGEEHXw",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "https://widgets.bradydallama.com/etsy",
        permanent: true,
      },
      {
        source: "/vgen",
        destination: "https://vgen.co/bradydallama/shop",
        permanent: true,
      },
      {
        source: "/etsy",
        destination: "https://bradydallamashop.etsy.com",
        permanent: true,
      },
    ];
  },
};
