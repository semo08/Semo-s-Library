// 날짜 포맷팅
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// 출판일 포맷팅 (YYYYMMDD -> YYYY.MM.DD)
export const formatPublishDate = (pubdate: string): string => {
  if (!pubdate || pubdate.length !== 8) return pubdate;

  const year = pubdate.slice(0, 4);
  const month = pubdate.slice(4, 6);
  const day = pubdate.slice(6, 8);

  return `${year}.${month}.${day}`;
};

// 별점을 별 문자열로 변환
export const ratingToStars = (rating: number | null): string => {
  if (rating === null) return '☆☆☆☆☆';

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(emptyStars);
};

// 텍스트 자르기
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// 배열을 N개씩 그룹으로 나누기 (책장 렌더링용)
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
