// =========================================================================
// OFFICIAL INSTAGRAM API INTEGRATION SERVICE
// Supports Meta Instagram Basic Display API & Instagram Graph API
// Documentation: https://developers.facebook.com/docs/instagram-basic-display-api
// =========================================================================

/**
 * Fetch dynamic media from official Instagram Graph / Basic Display API
 * @param {string} accessToken - User or Page Access Token
 * @param {string} [userId='me'] - Instagram User ID
 * @returns {Promise<{ posts: Array, reels: Array, raw: Array, success: boolean, error?: string }>}
 */
export async function fetchInstagramMedia(accessToken, userId = 'me') {
  if (!accessToken || !accessToken.trim()) {
    return {
      success: false,
      error: 'No Instagram Access Token configured.',
      posts: [],
      reels: [],
      raw: []
    };
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username,like_count,comments_count';
    const endpoint = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${encodeURIComponent(accessToken.trim())}&limit=25`;

    const response = await fetch(endpoint);
    const result = await response.json();

    if (!response.ok || result.error) {
      const errorMsg = result?.error?.message || `Instagram API Error: HTTP ${response.status}`;
      console.warn('[Instagram API]', errorMsg);
      return {
        success: false,
        error: errorMsg,
        posts: [],
        reels: [],
        raw: []
      };
    }

    const rawMedia = result.data || [];

    // Map into standard feed posts and 9:16 reels
    const posts = [];
    const reels = [];

    rawMedia.forEach((item, index) => {
      const isVideo = item.media_type === 'VIDEO';
      const imageSrc = isVideo ? (item.thumbnail_url || item.media_url) : item.media_url;
      const captionText = item.caption || `Post from @${item.username || 'anushkaunveiled'}`;
      const firstLine = captionText.split('\n')[0] || `Instagram Post #${index + 1}`;

      const formattedItem = {
        id: item.id || `ig-post-${index}`,
        title: firstLine.length > 50 ? `${firstLine.substring(0, 50)}...` : firstLine,
        category: isVideo ? 'Reels' : 'Instagram',
        image: imageSrc,
        thumbnail: imageSrc,
        likes: item.like_count ? `${item.like_count}` : 'View on IG',
        comments: item.comments_count ? `${item.comments_count}` : 'Comments',
        views: isVideo ? 'Reel' : 'Post',
        date: item.timestamp ? new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : `Post ${index + 1}`,
        location: 'Instagram',
        caption: captionText,
        tags: (captionText.match(/#[a-zA-Z0-9_]+/g) || ['#anushkaunveiled']).slice(0, 5),
        instagramUrl: item.permalink || `https://www.instagram.com/anushkaunveiled/`,
        mediaType: item.media_type,
        isVideo: isVideo
      };

      if (isVideo) {
        reels.push({
          ...formattedItem,
          duration: '0:30',
          sound: `Original Audio - @${item.username || 'anushkaunveiled'}`
        });
      } else {
        posts.push(formattedItem);
      }
    });

    return {
      success: true,
      posts: posts.length > 0 ? posts : null,
      reels: reels.length > 0 ? reels : null,
      raw: rawMedia
    };
  } catch (err) {
    console.warn('[Instagram API Network Error]', err);
    return {
      success: false,
      error: err.message || 'Network error while contacting Instagram API',
      posts: [],
      reels: [],
      raw: []
    };
  }
}

/**
 * Highlights Policy Notice:
 * Meta's official Instagram Basic Display and Graph API endpoints explicitly
 * DO NOT provide a public API for Permanent Profile Highlights.
 * As per architectural rules, highlights gracefully link directly to official Instagram.
 */
export const HIGHLIGHTS_API_POLICY = {
  isSupportedByMeta: false,
  policyNotice: 'Meta Instagram Graph API does not provide a public endpoint for Permanent Profile Highlights. Highlights fall back gracefully to official profile links.',
  profileUrl: 'https://www.instagram.com/anushkaunveiled/',
  deepLink: 'instagram://user?username=anushkaunveiled'
};
