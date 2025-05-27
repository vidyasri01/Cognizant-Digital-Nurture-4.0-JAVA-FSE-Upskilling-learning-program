SELECT u.full_name, u.email
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
WHERE r.registration_date IS NULL 
   OR r.registration_date < CURDATE() - INTERVAL 90 DAY;
