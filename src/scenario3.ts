/*

Unbounded queue and publishes asap (again);
Ventilator (or Subscription Manager) knows about the subscribers:
    Observer used to push to subscribers (Explicit subscription);
    Different specializations of ventilators (Fanout, Round-robin...).

With steroids:
(do this one-->) Understands receipt notification (ACK) from subscribers;
May use Heart Beat, Timeout and Circuit breaker patterns to deal with delivery failures;
Manages message meta-information, such as marking them as tentatively consumed, until it has such guarantees (e.g., to avoids losing messages).

*/