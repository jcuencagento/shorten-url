import React, { useEffect } from 'react';

const connection = require('../lib/db');

function Dashboard() {
    useEffect(() => {
        async function fetchData() {
            try {
                const create_users = `CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, avatar VARCHAR(255))`;
                connection.query(create_users, (err, results) => {
                    if (err) {
                        console.error('Error creating table:', err);
                    } else {
                        console.log('Table created successfully:', results);
                    }
                });

                connection.end();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div><h2>DASHBOARD</h2></div>
    )
}

export default Dashboard;