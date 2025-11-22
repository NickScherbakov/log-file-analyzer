export const demoLogContent = `2025-11-22T09:15:03.124Z INFO Server start sequence initiated
2025-11-22T09:15:03.555Z DEBUG Loading configuration file path="/etc/app/config.yml" size=4821
2025-11-22T09:15:04.002Z INFO Connected to database host=db.internal.local latency=12ms
2025-11-22T09:15:04.450Z WARN Cache warmup exceeded expected duration elapsed=845ms threshold=500ms
2025-11-22T09:15:05.000Z ERROR Failed to fetch user profile id=938120 reason="Timeout contacting profile-service"
2025-11-22T09:15:05.050Z ERROR Failed to fetch user profile id=1938121 reason="Timeout contacting profile-service"
2025-11-22T09:15:05.100Z ERROR Failed to fetch user profile id=5588122 reason="Timeout contacting profile-service"
2025-11-22T09:15:05.500Z INFO Retrying failed user profile batch size=3
2025-11-22T09:15:06.025Z DEBUG Profile retry result userIds=[938120,1938121,5588122] status=partial-success
2025-11-22T09:15:06.100Z WARN Slow external API call name=geo-ip elapsed=1210ms
2025-11-22T09:15:06.250Z INFO Metrics flushed counters=34 gauges=12 timers=5
2025-11-22T09:15:07.000Z ERROR Payment gateway error code=PGW-442 message="Card declined" orderId=abf0c4d9-2d52-4e1f-a6b9-73f2f1c5d001
2025-11-22T09:15:07.050Z ERROR Payment gateway error code=PGW-442 message="Card declined" orderId=2c0f9a81-713d-4f58-8c27-59fc13df17aa
2025-11-22T09:15:07.100Z ERROR Payment gateway error code=PGW-442 message="Card declined" orderId=9b9c1f84-45b0-4972-8b71-2af58f9e610e
2025-11-22T09:15:07.250Z INFO Queue depth gauge value=412
2025-11-22T09:15:07.900Z DEBUG Background job started jobId=HEX0x3fa91c user=system
2025-11-22T09:15:08.123Z ERROR Payment gateway error code=PGW-500 message="Gateway internal error" orderId=4e2ff2c1-e1d4-4c0c-9095-2f2db25e5a21
2025-11-22T09:15:08.400Z INFO Initiating graceful shutdown reason=maintenance
2025-11-22T09:15:08.500Z WARN Pending requests exceed safe threshold active=212 threshold=200
2025-11-22T09:15:08.750Z ERROR Shutdown stall: open connections=37
2025-11-22T09:15:09.000Z INFO Shutdown progress stage=connections-closed remaining=5
2025-11-22T09:15:09.250Z INFO Shutdown progress stage=resources-released remaining=0
2025-11-22T09:15:09.500Z INFO Shutdown complete uptime=360s
1732276500 INFO Epoch timestamp example line (seconds)
1732276500123 WARN Epoch timestamp example line (milliseconds)
No severity token on this line but still informative content
Nov 22, 2025 09:15:10 ERROR Legacy formatted timestamp with error marker code=42
11/22/2025 09:15:11 WARN US formatted timestamp with warning marker latency=850ms`;
