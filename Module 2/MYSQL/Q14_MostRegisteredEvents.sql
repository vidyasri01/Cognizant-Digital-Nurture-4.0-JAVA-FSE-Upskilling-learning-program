SELECT e.title, COUNT(r.user_id) AS registrations
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id
ORDER BY registrations DESC
LIMIT 3;
