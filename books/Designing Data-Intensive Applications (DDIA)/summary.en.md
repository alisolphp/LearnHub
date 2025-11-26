# Book Summary: Designing Data-Intensive Applications

* **Author**: Martin Kleppmann
* **Genre**: Distributed Systems & Data Engineering
* **Publication Date**: March 2017
* **Book Link**: https://amazon.com/dp/1449373321

This document summarizes the key lessons and insights extracted from the book.
I highly recommend reading the original book for the full depth and author's perspective.

## Before You Get Started
* I summarize key points from useful books to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Preface

**Summary**: Martin wrote this book because the world of data tools exploded with buzzwords—NoSQL, Big Data, MapReduce, eventual consistency—but the fundamentals never changed. He digs into why certain systems work the way they do, peels back the covers on real production systems, and connects academic research to the messy reality engineers face every day. It’s not a tutorial on any single tool; it’s a map for navigating the whole landscape so you can pick the right pieces and glue them together confidently.

**Example**: Think of it like learning the physics of engines instead of just memorizing how to drive specific car models—you’ll be able to handle anything that comes out next year.

**Link for More Details**:
[Ask AI: Preface](https://alisol.ir/?ai=Preface|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 1. Reliable, Scalable, and Maintainable Applications

**Summary**: Data-intensive apps live or die by three big ideas: reliability (keep working even when everything breaks), scalability (grow without exploding), and maintainability (don’t make future engineers hate you). Martin walks through hardware faults giving way to software-level tolerance, why human error is the real killer of production systems, how to measure load and performance with tail-latency percentiles, and why operability, simplicity, and evolvability matter more than raw speed.

**Example**: Netflix’s Chaos Monkey randomly murdering processes in production so the system learns to heal itself—that’s deliberate fault injection in action.

**Link for More Details**:
[Ask AI: Reliable, Scalable, and Maintainable Applications](https://alisol.ir/?ai=Reliable%2C%20Scalable%2C%20and%20Maintainable%20Applications|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 2. Data Models and Query Languages

**Summary**: Relational models still rule for many-to-many relationships and data integrity, but document models shine when you need locality for hierarchical data. NoSQL isn’t the end of SQL—it’s just a reaction to impedance mismatch. Graph models (property graphs, triple-stores, Cypher, SPARQL, Datalog) are perfect when relationships are the star. Declarative queries (SQL, Cypher) beat imperative ones for parallelism and evolution.

**Example**: Storing a résumé as a single JSON document means one read grabs everything; in a normalized relational schema you’d need a dozen joins.

**Link for More Details**:
[Ask AI: Data Models and Query Languages](https://alisol.ir/?ai=Data%20Models%20and%20Query%20Languages|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 3. Storage and Retrieval

**Summary**: LSM-trees (SSTables + memtables) dominate write-heavy workloads; B-trees still own read-heavy ones. Columnar storage (Parquet, ORC) crushes analytics by compressing and skipping irrelevant data. Materialized aggregates and data cubes trade space for speed. The storage engine you pick changes everything about performance and operational burden.

**Example**: Clickstream analytics on billions of rows—columnar format lets you sum a single column without touching the rest.

[Personal note: Leveled compaction is still solid, but ZSTD and newer dictionary compression often beat LZ4 today.]

**Link for More Details**:
[Ask AI: Storage and Retrieval](https://alisol.ir/?ai=Storage%20and%20Retrieval|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 4. Encoding and Evolution

**Summary**: Schemas aren’t optional—they’re the secret to safe evolution. Avro + schema registry beats Thrift/Proto for dynamic environments. Backward/forward compatibility plus field tags let you evolve APIs without downtime. REST/RPC boundaries blur when you add data encoding discipline.

**Example**: Adding a new field to an Avro message—old readers ignore it, new readers get a default. Zero coordination needed.

[Personal note: gRPC + Protobuf has largely taken over where Thrift once lived in new projects.]

**Link for More Details**:
[Ask AI: Encoding and Evolution](https://alisol.ir/?ai=Encoding%20and%20Evolution|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 5. Replication

**Summary**: Single-leader is simple but has lag problems; multi-leader handles offline clients and multi-DC; leaderless (Dynamo-style) gives high availability via quorums but needs read repair and version vectors. Replication lag breaks monotonic reads and consistent prefix—fix with read-your-writes or transaction IDs.

**Example**: Riak’s sloppy quorums and hinted handoff let a node go down without rejecting writes.

**Link for More Details**:
[Ask AI: Replication](https://alisol.ir/?ai=Replication|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 6. Partitioning

**Summary**: Partition by key range or hash, then rebalance—dynamic partitioning avoids hot spots. Secondary indexes either document-partitioned (local) or term-partitioned (global). Request routing via ZooKeeper or gossip. Skew kills performance; celebrities and time-series need special care.

**Example**: Cassandra’s vnodes spread load evenly across nodes instead of one giant range per node.

**Link for More Details**:
[Ask AI: Partitioning](https://alisol.ir/?ai=Partitioning|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 7. Transactions

**Summary**: ACID is marketing—real isolation levels matter. Snapshot isolation (MVCC) is cheap and popular but allows write skew. Serializability via 2PL or SSI prevents phantoms and lost updates. Stored procedures and in-memory single-threaded execution give true serial order without locks.

**Example**: Meeting-room booking conflict—snapshot isolation lets two people book the same slot unless you add explicit locking or materialization.

[Personal note: Serializable Snapshot Isolation (SSI) is now default in Postgres 15+ and feels almost free.]

**Link for More Details**:
[Ask AI: Transactions](https://alisol.ir/?ai=Transactions|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 8. The Trouble with Distributed Systems

**Summary**: Networks drop packets, clocks lie, processes pause—everything is unreliable. Timeouts are guesses, NTP is ~10 ms accurate at best, leap seconds still bite. Byzantine faults and fuzzy failures mean you can’t trust any single node. Assume partial failures always.

**Example**: A GC pause makes a node look dead for 30 seconds even though it’s fine—fencing tokens save you from split-brain horror.

**Link for More Details**:
[Ask AI: The Trouble with Distributed Systems](https://alisol.ir/?ai=The%20Trouble%20with%20Distributed%20Systems|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 9. Consistency and Consensus

**Summary**: Linearizability is expensive; causal consistency is often enough. Total-order broadcast = consensus. Raft, Zab, and Paxos give you fault-tolerant agreement. Two-phase commit works but blocks on coordinator failure. Use fencing tokens for exactly-once semantics.

**Example**: ZooKeeper’s Zab guarantees linearizable writes for locks and leader election.

[Personal note: etcd + Raft has mostly replaced ZooKeeper in new green-field projects.]

**Link for More Details**:
[Ask AI: Consistency and Consensus](https://alisol.ir/?ai=Consistency%20and%20Consensus|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 10. Batch Processing

**Summary**: Unix philosophy—small tools, pipes, sort—still crushes. MapReduce gave us fault-tolerant massive parallelism but materialized everything. Spark/Tez/Flink brought dataflow DAGs and in-memory caching. Joins on the map side when possible; reduce side when not.

**Example**: Building a search index from 100 TB of logs—MapReduce does it in hours on 1000 machines with zero babysitting.

**Link for More Details**:
[Ask AI: Batch Processing](https://alisol.ir/?ai=Batch%20Processing|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 11. Stream Processing

**Summary**: Logs are the truth—Kafka/Robook/Pulsar. Event time vs processing time is the eternal fight. Micro-batching (Spark) vs true streaming (Flink). Exactly-once via idempotence or transactional sinks. Change-data-capture + event sourcing = immutable gold.

**Example**: Maintaining a search index live—Kafka topic → stream processor → Elasticsearch.

[Personal note: Kafka Streams and Flink have largely replaced Storm and Samza in new workloads.]

**Link for More Details**:
[Ask AI: Stream Processing](https://alisol.ir/?ai=Stream%20Processing|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

## 12. The Future of Data Systems

**Summary**: Unbundle the database—storage, indexes, materialized views, caching as separate services orchestrated via logs. Derived data everywhere. End-to-end integrity arguments beat local checks. Timeliness + correctness > stale consistency. Do the right thing even when no one’s watching.

**Example**: A cache invalidated by log replay instead of dual writes—finally no stale reads.

[Personal note: Eight years later this chapter predicted Snowflake, dbt, Materialize, and the entire modern data stack perfectly.]

**Link for More Details**:
[Ask AI: The Future of Data Systems](https://alisol.ir/?ai=The%20Future%20of%20Data%20Systems|Martin%20Kleppmann|Designing%20Data-Intensive%20Applications)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
