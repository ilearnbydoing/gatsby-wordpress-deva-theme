import { graphql } from "gatsby";

/**
 * These so called fragments are the fields we query on each template.
 * A fragment make queries a bit more reuseable, so instead of typing and
 * remembering every possible field, you can just use
 *   ...WordPressPostsData
 * for example to load all post fields into your GraphQL query.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/graphql-reference/#fragments
 *
 */

// Used for site config
export const wordPressPostData = graphql`
  fragment WordPressPostData on wordpress__POST {
    title
    content
    excerpt
    plainExcerpt
    plainTitle
    slug: permaLinkSlug
    categories {
      name
      slug
    }
    readingTime
    featured_media: featured_media_custom {
      localFile {
        publicURL
        childImageSharp {
          fluid(maxWidth: 2000, sizes: "90") {
            ...GatsbyImageSharpFluid
          }
        }
        seo: childImageSharp {
          fixed(width: 1200, quality: 100) {
            src
          }
        }
        
      }
    }
    author {
      name
      slug
      avatar_urls {
        wordpress_96
      }
      description
    }
    tags: tags_custom {
      name
      slug
    }
    date(formatString: "MMMM DD YYYY")
    modified(formatString: "MMMM DD YYYY")
    sticky
  }
`;

// export const wordpressSiteMetaData = graphql`
//   fragment WordpressSiteMetaData on WPSiteMetaData {
//     name: siteName
//     description: siteDescription
//     language: language
//   }
// `;

export const wordpressPageData = graphql`
  fragment WordpressPageData on wordpress__PAGE {
    title
    content
    excerpt
    plainExcerpt
    plainTitle
    slug
    readingTime
    featured_media: featured_media_custom {
      localFile {
        publicURL
        childImageSharp {
          fluid(maxWidth: 2000, sizes: "90") {
            ...GatsbyImageSharpFluid
          }
        }
        seo: childImageSharp {
          fixed(width: 1200, quality: 100) {
            src
          }
        }
      }
    }
    author {
      name
      slug
      avatar_urls {
        wordpress_96
      }
      description
    }
    date(formatString: "MMMM DD YYYY")
    modified(formatString: "MMMM DD YYYY")
  }
`;

export const wordpressAuthorData = graphql`
  fragment WordpressAuthorData on wordpress__wp_users {
    name
    slug
    description
    avatar_urls {
      wordpress_96
    }
  }
`;
