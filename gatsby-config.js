module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Trelfaux`,
        short_name: `Trelfaux`,
        start_url: `/`,
        display: `standalone`,
        background_color: `#ffc600`,
        theme_color: `#ffc600`,
        icon: `src/images/favicon-1024.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
  ],
};
