SELECT u.full_name,
       e.status,
       COUNT(e.event_id) AS total_events
FROM Events e
JOIN Users u ON e.organizer_id = u.user_id
GROUP BY e.organizer_id, e.status;
