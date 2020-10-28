module.exports = class FeedbackApp {
  /**
   * _format date to mm/dd/yyyy string
   * @param {string} date: _string date to convert
   * @returns {string}: _formatted date
   */
  getFormattedDate(date) {
    const dateObj = new Date(date);
    return (
      dateObj.getMonth() +
      1 +
      '/' +
      dateObj.getDate() +
      '/' +
      dateObj.getFullYear()
    );
  }

  /**
   * _format rating to stars
   * @param {number} rating: _rating in 0-100
   * @returns {string}: _stars string
   */
  getFormattedRating(rating) {
    const stars = rating / 20;
    const fullStars = stars >> 0;
    const halfStar = stars - fullStars >= 0.5;

    return '★'.repeat(fullStars) + (halfStar ? '½' : '');
  }

  /**
   * _formatter for feedback json
   * @param {object} feedback: _feedback for format
   * @returns {string}: _formatted string
   */
  formatFeedback(feedback) {
    const date = this.getFormattedDate(feedback.date);
    const rating = feedback.hasOwnProperty('rating')
      ? this.getFormattedRating(feedback.rating)
      : '';
    const nameWithComment = `${feedback.word}: ${feedback.comment}`;

    /**
     * _if result string has equal or less then 80 characters
     */
    if (nameWithComment.length + date.length + rating.length + 1 <= 80) {
      return `${nameWithComment}${rating ? ' ' + rating : ''} (${date})`;
    }

    /**
     * _if result string has more then 80 characters without date
     */
    const lineLength = nameWithComment.length + rating.length + 1;
    if (lineLength > 80) {
      const trunkLength = lineLength - 80 + rating.length + 3 + 1;
      return `${nameWithComment.substring(0, lineLength - trunkLength)}...${
        rating ? ' ' + rating : ''
      }`;
    }

    /**
     * _if result without date equal or less then 80 characters
     */
    return `${nameWithComment}${rating ? ' ' + rating : ''}`;
  }
};
