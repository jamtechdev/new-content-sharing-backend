'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payment', [
      {
        user_id: 1,
        model_id: 1,
        amount: 19.99,
        payment_method: 'credit card',
        payment_status: 'completed',
        payment_type: 'subscription',
        chat_session_id: null,
        video_call_id: null,
        premium_content_id: null,
        transaction_id: 'TXN001',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        model_id: 1,
        amount: 9.99,
        payment_method: 'PayPal',
        payment_status: 'completed',
        payment_type: 'tip',
        chat_session_id: null,
        video_call_id: null,
        premium_content_id: null,
        transaction_id: 'TXN002',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payment', null, {});
  }
};
