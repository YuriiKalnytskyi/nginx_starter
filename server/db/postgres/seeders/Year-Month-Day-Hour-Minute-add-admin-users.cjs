module.exports = {
    up: async (queryInterface) => {
        const users = [
            {

                email: 'admin@gmail.com',
                first_name: 'admin',
                last_name: 'admin',

            },

        ];

         await queryInterface.bulkInsert('Users', users, );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Users', null);
    }
};

