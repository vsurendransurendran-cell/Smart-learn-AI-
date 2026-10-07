import { LibraryBook } from '../../types';

export const COLLEGE_PROJECT_BOOKS: LibraryBook[] = [
  // 1. Autonomous Drone Navigation with SLAM
  {
    id: 'book-proj-drone-slam',
    title: 'Autonomous Drone Navigation & Obstacle Avoidance via Visual SLAM & ROS 2',
    author: 'Student Engineering Lead: Liam K. Patel (Robotics & Autonomous Systems)',
    category: 'projects',
    badge: 'Top Student Project • Robotics & AI',
    description: 'Complete capstone project book on building a GPS-denied autonomous quadcopter with stereo camera Visual SLAM, NVIDIA Jetson Orin Nano, PX4 flight controller, and 3D obstacle avoidance.',
    coverEmoji: '🚁',
    coverColor: 'from-sky-600 via-indigo-700 to-slate-900',
    totalPages: 10,
    readPages: [],
    projectMetadata: {
      difficulty: 'Capstone',
      domain: 'Robotics, Computer Vision & Embedded Systems',
      techStack: ['ROS 2 Humble', 'C++20', 'Python', 'ORB-SLAM3', 'PX4 Autopilot', 'OpenCV', 'Gazebo', 'Docker'],
      timelineWeeks: 12,
      githubRepo: 'https://github.com/mit-robotics-club/autonomous-drone-slam',
      keyDeliverables: [
        'ROS 2 Visual SLAM Node running at 30 FPS on Jetson Orin',
        'MAVROS MAVLink bidirectional flight telemetry pipeline',
        'OctoMap 3D voxel grid generation for real-time path planning',
        'A* 3D global path planner and minimum jerk trajectory generator',
        'Gazebo SITL simulation environment mimicking physical arena'
      ],
      hardwareRequired: [
        'Holybro S500 V2 Quadcopter Frame Kit',
        'NVIDIA Jetson Orin Nano Developer Kit (8GB)',
        'Intel RealSense D435i Stereo Depth Camera',
        'Holybro Pixhawk 6C Flight Controller',
        'RPLiDAR A2M8 360-degree Laser Scanner',
        '4S 5000mAh LiPo Battery & Matek Systems PDB'
      ]
    },
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Project Overview, Industry Relevance & Real-World Impact',
        content: `PROJECT TITLE: Autonomous Quadcopter Navigation in GPS-Denied Environments Using Stereo Visual-Inertial SLAM and ROS 2
ACADEMIC DOMAIN: Robotics, Computer Vision, Embedded Cyber-Physical Systems
PROJECT TYPE: Senior Year Undergraduate Capstone / Masters Thesis

EXECUTIVE SUMMARY:
Traditional commercial drones rely heavily on Global Positioning System (GPS) signals for localization and hover stability. However, inside warehouses, subterranean tunnels, collapsed buildings, and dense urban canyons, GPS signals are degraded, jammed, or completely unavailable. This project presents a complete hardware and software blueprint for an autonomous quadcopter capable of navigating cluttered, GPS-denied indoor spaces using purely on-board visual-inertial sensors and embedded edge computing.

CORE OBJECTIVES:
1. Real-Time Localization: Implement Visual-Inertial Simultaneous Localization and Mapping (VI-SLAM) using an Intel RealSense D435i camera to estimate 6-DOF drone pose at >= 30 Hz with under 2% drift.
2. 3D Occupancy Mapping: Convert live depth point clouds into an OctoMap (probabilistic 3D occupancy voxel grid) with 5cm voxel resolution.
3. Autonomous Path Planning: Execute global 3D path planning using Jump Point Search (JPS) and trajectory optimization via minimum snap polynomials to avoid dynamic obstacles.
4. Fail-Safe Flight Control: Maintain stable offboard flight mode using PX4 Autopilot and MAVROS via high-speed UART serial links.

INDUSTRY RELEVANCE:
This project directly reflects production robotics systems deployed at Skydio, Boston Dynamics, Amazon Prime Air, and search-and-rescue emergency response teams.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: System Architecture & ROS 2 Node Topology Flow',
        content: `SYSTEM ARCHITECTURE & ROS 2 NODE TOPOLOGY:

The system is architected as an asynchronous, distributed ROS 2 Humble computation graph running on Ubuntu 22.04 LTS on the NVIDIA Jetson Orin Nano companion computer, connected over serial UART to the Pixhawk 6C microcontroller.

DATA FLOW & ROS 2 TOPICS:
1. Camera Driver Node (/camera/realsense_node):
   - Publishes: /camera/infra1/image_rect_raw (Stereo Left, 30 Hz)
   - Publishes: /camera/infra2/image_rect_raw (Stereo Right, 30 Hz)
   - Publishes: /camera/imu (Gyroscope & Accelerometer, 200 Hz)

2. SLAM Node (/orb_slam3_ros2_node):
   - Subscribes to stereo image streams and IMU topic.
   - Computes feature tracking (ORB features), local bundle adjustment, and loop closure.
   - Publishes: /slam/pose (geometry_msgs/PoseStamped, 30 Hz)
   - Publishes: /slam/pointcloud (sensor_msgs/PointCloud2, keyframes)

3. Flight Bridge Node (/mavros_node):
   - Feeds /slam/pose into Pixhawk via MAVLink VISION_POSITION_ESTIMATE message.
   - Subscribes: /mavros/state (ARMED, OFFBOARD status).
   - Publishes: /mavros/setpoint_position/local (Target waypoints).

4. Mapping Node (/octomap_server_node):
   - Subscribes: /camera/depth/color/points and /slam/pose.
   - Produces: /octomap_binary and /octomap_occupied_cells_vis_array.

5. Motion Planning Node (/trajectory_planner_node):
   - Subscribes: /octomap_binary and /move_base_simple/goal.
   - Outputs smooth polynomial trajectories at 50 Hz to flight controller.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Hardware Bill of Materials (BOM), Circuit Wiring & Jetson Pinout',
        content: `HARDWARE BILL OF MATERIALS (BOM) & POWER BUDGET:

1. Airframe & Propulsion:
   - Frame: Holybro S500 V2 Glass Fiber Frame (480mm diagonal)
   - Motors: 4x 2216 880KV Brushless Motors
   - ESCs: 4x 30A BLHeli_S Electronic Speed Controllers (DShot600 protocol)
   - Propellers: 10x4.5 inch Carbon-Reinforced Propellers
   - Maximum Thrust: ~3.6 kg total (Drone all-up-weight AUW: 1.85 kg -> Thrust-to-weight ratio 1.95:1)

2. Computing & Sensors:
   - Companion Computer: NVIDIA Jetson Orin Nano (6-core ARM Cortex-A78AE, 1024-core Ampere GPU, 8GB RAM)
   - Flight Controller: Holybro Pixhawk 6C (STM32H743 MCU, Dual InvenSense IMUs, Barometer)
   - Stereo Camera: Intel RealSense D435i (Global shutter IR stereo + RGB + Bosch BMI055 IMU)
   - 2D LiDAR: Slamtec RPLiDAR A2M8 (12-meter range, 10 Hz scan rate)

3. Power Distribution & Wiring Schematic:
   - Primary Battery: 4S 14.8V 5000mAh 60C LiPo Battery
   - Power Distribution Board (PDB): Matek Systems PDB-XT60
   - Voltage Regulation:
     - 14.8V Direct -> 4x ESC power leads (Heavy 14AWG silicone wire)
     - 5.0V 3A Low-Noise UBEC -> Pixhawk 6C Power Module 1
     - 12.0V 5A High-Efficiency Buck-Boost Regulator -> NVIDIA Jetson Orin Nano DC Jack
   - Communication Interconnects:
     - Jetson UART (Pins 8 TXD, 10 RXD, 9 GND) <--> Pixhawk TELEM2 port (115200 baud)
     - RealSense D435i <--> Jetson USB 3.2 Gen 2 Port (High-bandwidth shielded cable)`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Visual SLAM Algorithm (ORB-SLAM3) & State Estimation with EKF',
        content: `VISUAL SLAM MATHEMATICAL FORMULATION & EXTENDED KALMAN FILTERING:

1. ORB Feature Extraction & Matching:
The Intel RealSense camera provides synchronized stereo frames (I_L, I_R). FAST corner detection extracts ~1000 keypoints per image across an 8-level scale pyramid. BRIEF binary descriptors (256 bits) are generated using oriented gradients. Stereo epipolar geometry restricts feature matching along horizontal scanlines.

2. Bundle Adjustment Optimization:
Visual-Inertial ORB-SLAM3 minimizes the joint photometric re-projection error and IMU pre-integration error:
J(S) = sum_{k, i} rho(|| z_{k, i} - h(x_k, l_i) ||^2_{Sigma}) + sum_k || r_I(x_k, x_{k+1}) ||^2_{Sigma_I}

Where:
- z_{k, i} is the observed pixel coordinates of 3D landmark l_i at time step k.
- h(x_k, l_i) is the pinhole camera projection function: [u, v]^T = [f_x * X/Z + c_x, f_y * Y/Z + c_y].
- rho() is the Huber robust loss function mitigating the impact of erroneous feature matches.
- r_I is the IMU pre-integrated residual vector derived from accelerometers and gyroscopes.

3. Sensor Fusion with Pixhawk EKF2:
Pixhawk runs an onboard 24-state Extended Kalman Filter (EKF2). The SLAM position estimate (X, Y, Z, Quaternion) is fused with the onboard barometric altimeter and high-rate (1 kHz) internal IMUs. If visual tracking is lost due to motion blur, the EKF smoothly coasts on IMU dead-reckoning for up to 2 seconds while requesting relocalization.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: 12-Week Sprint Implementation Roadmap & Milestones',
        content: `12-WEEK CAPSTONE IMPLEMENTATION ROADMAP:

WEEK 1-2: HARDWARE PROCUREMENT & BENCHTOP BRING-UP
- Assemble Holybro S500 frame, mount motors, solder PDB and ESC connections.
- Flash Pixhawk 6C with PX4 v1.14 Autopilot firmware.
- Perform benchtop motor spin test and calibrate ESC end-points.
- Install Ubuntu 22.04 LTS and ROS 2 Humble on NVIDIA Jetson Orin Nano.

WEEK 3-4: SENSOR CALIBRATION & SIMULATION SETUP
- Intrinsic and extrinsic camera-IMU calibration using Kalibr toolbox with a AprilGrid target.
- Set up Gazebo Garden simulation with PX4 Software-in-the-Loop (SITL).
- Validate MAVROS bidirectional communication in simulation.

WEEK 5-6: SLAM PIPELINE INTEGRATION
- Compile ORB-SLAM3 with CUDA GPU acceleration on Jetson Orin.
- Create custom ROS 2 wrapper publishing geometry_msgs/PoseStamped.
- Verify tracking in hand-held laboratory walking tests; measure drift against OptiTrack ground truth.

WEEK 7-8: 3D OCCUPANCY MAPPING & OBSTACLE DETECTION
- Integrate octomap_server to build real-time 3D voxel grids from stereo depth maps.
- Implement point cloud passthrough and Euclidean cluster extraction for dynamic obstacle isolation.

WEEK 9-10: AUTONOMOUS FLIGHT & TRAJECTORY GENERATION
- Implement 3D A* path planning node and minimum-snap polynomial trajectory generator.
- Conduct tethered indoor flight tests in OFFBOARD mode.
- Tune PID position and velocity control loops on Pixhawk.

WEEK 11-12: TESTING, OPTIMIZATION & FINAL DEMO
- Un-tethered autonomous navigation through a simulated warehouse obstacle course.
- Benchmark latency, CPU/GPU thermal dissipation, and battery endurance (achieved 14.5 minutes flight time).
- Compile final project report, GitHub repository documentation, and video demonstration.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Production C++ ROS 2 Node Code & Flight Control Reference',
        content: `PRODUCTION C++ ROS 2 FLIGHT CONTROLLER NODE (drone_offboard_controller.cpp):

\`\`\`cpp
#include <rclcpp/rclcpp.hpp>
#include <geometry_msgs/msg/pose_stamped.hpp>
#include <mavros_msgs/msg/state.hpp>
#include <mavros_msgs/srv/command_bool.hpp>
#include <mavros_msgs/srv/set_mode.hpp>

class OffboardController : public rclcpp::Node {
public:
  OffboardController() : Node("offboard_controller") {
    state_sub_ = create_subscription<mavros_msgs::msg::State>(
      "/mavros/state", 10, std::bind(&OffboardController::stateCallback, this, std::placeholders::_1));
    
    target_pub_ = create_publisher<geometry_msgs::msg::PoseStamped>(
      "/mavros/setpoint_position/local", 10);
    
    arming_client_ = create_client<mavros_msgs::srv::CommandBool>("/mavros/cmd/arming");
    set_mode_client_ = create_client<mavros_msgs::srv::SetMode>("/mavros/set_mode");

    timer_ = create_wall_timer(
      std::chrono::milliseconds(50), // 20 Hz setpoint stream
      std::bind(&OffboardController::timerCallback, this));
    
    RCLCPP_INFO(get_logger(), "Autonomous Offboard Flight Node Initialized.");
  }

private:
  void stateCallback(const mavros_msgs::msg::State::SharedPtr msg) {
    current_state_ = *msg;
  }

  void timerCallback() {
    // PX4 requires streaming setpoints BEFORE entering OFFBOARD mode
    geometry_msgs::msg::PoseStamped target_pose;
    target_pose.header.stamp = now();
    target_pose.header.frame_id = "map";
    target_pose.pose.position.x = 0.0;
    target_pose.pose.position.y = 0.0;
    target_pose.pose.position.z = 1.5; // Hover at 1.5 meters altitude
    target_pose.pose.orientation.w = 1.0;

    target_pub_->publish(target_pose);

    if (current_state_.mode != "OFFBOARD" && (now() - last_request_).seconds() > 5.0) {
      auto mode_req = std::make_shared<mavros_msgs::srv::SetMode::Request>();
      mode_req->custom_mode = "OFFBOARD";
      set_mode_client_->async_send_request(mode_req);
      last_request_ = now();
    } else if (!current_state_.armed && (now() - last_request_).seconds() > 5.0) {
      auto arm_req = std::make_shared<mavros_msgs::srv::CommandBool::Request>();
      arm_req->value = true;
      arming_client_->async_send_request(arm_req);
      last_request_ = now();
    }
  }

  rclcpp::Subscription<mavros_msgs::msg::State>::SharedPtr state_sub_;
  rclcpp::Publisher<geometry_msgs::msg::PoseStamped>::SharedPtr target_pub_;
  rclcpp::Client<mavros_msgs::srv::CommandBool>::SharedPtr arming_client_;
  rclcpp::Client<mavros_msgs::srv::SetMode>::SharedPtr set_mode_client_;
  rclcpp::TimerBase::SharedPtr timer_;
  mavros_msgs::msg::State current_state_;
  rclcpp::Time last_request_{0};
};
\`\`\``
      },
      {
        pageNumber: 7,
        title: 'Page 7: Gazebo Simulation Environment, PX4 SITL & Testing Pipeline',
        content: `GAZEBO SIMULATION & DIGITAL TWIN TESTING PIPELINE:

Before risking expensive physical carbon fiber frames and LiPo batteries, 90% of development was verified in simulation using Gazebo Garden and PX4 Software-in-the-Loop (SITL).

SIMULATION PIPELINE CONFIGURATION:
1. PX4 SITL Model:
   - We authored an SDF (Simulation Description Format) model matching Holybro S500 inertia tensors, motor motor-constants, and drag coefficients.
   - Sensor Plugins: Simulated RealSense D435i camera plugin rendering stereo RGB images and depth buffers at 30 FPS using OpenGL shaders, with realistic Gaussian noise on IMU gyro/accel streams.

2. Virtual Test Arena:
   - Generated a complex 20m x 20m x 4m indoor warehouse model populated with industrial pallet racks, pillars, moving forklift models, and low-texture drywall obstacles.

3. Automated CI/CD Regression Testing:
   - Docker Container: Packaged the entire simulation stack (ROS 2 + PX4 + Gazebo + headless X11 via Xvfb).
   - Python Test Suite: Ran 50 automated flight tests on GitHub Actions. Test criteria: Drone must takeoff, navigate between 10 random waypoints without collisions, and land safely within 60 seconds.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Path Planning (A* / RRT*) & Real-time Obstacle Avoidance',
        content: `3D PATH PLANNING & COLLISION AVOIDANCE ALGORITHMS:

1. Global Path Planning (3D Jump Point Search):
Standard A* over a dense 3D voxel grid (100x100x50 = 500,000 cells) evaluates thousands of redundant nodes. Jump Point Search (JPS) accelerates A* by orders of magnitude by pruning symmetric neighbors and jumping along straight lines until an obstacle boundary (turning point) is encountered.
- Heuristic: Euclidean distance h(n) = sqrt((x - x_g)^2 + (y - y_g)^2 + (z - z_g)^2).
- Search Latency: < 15ms for a 15-meter indoor path.

2. Trajectory Optimization (Minimum Snap Polynomials):
Quadcopters cannot track piecewise-linear waypoint corners without decelerating to zero velocity. Quadcopter motor dynamics are directly coupled to the fourth derivative of position (Snap = d^4 x / dt^4).
- Polynomial Trajectory: P_i(t) = sum_{j=0}^{7} c_{ij} * t^j (7th-order polynomial).
- Formulation: Minimize integral of || d^4 p(t) / dt^4 ||^2 subject to waypoint boundary constraints, maximum velocity limits (v_max = 2.0 m/s), and maximum acceleration limits (a_max = 1.5 m/s^2).

3. Dynamic Obstacle Reactive Avoidance (Vector Field Histogram 3D):
When a person enters the flight corridor, OctoMap updates within 33ms. A 3D polar histogram computes obstacle density around the drone. If a collision is predicted within 1.0 second, the trajectory optimizer instantly inserts an avoidance sub-goal perpendicular to the obstacle velocity vector.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Sensor Noise Calibration, Hardware Debugging & Pitfalls',
        content: `CHALLENGES, HARDWARE PITFALLS & PRACTICAL SOLUTIONS:

1. Pitfall: High-Frequency Motor Vibration Shaking the IMU
- Issue: Propeller vibrations at 150-250 Hz saturated the RealSense internal accelerometer, causing the SLAM pose to diverge into the ceiling within 5 seconds.
- Solution: Designed a 3D-printed TPU (Thermoplastic Polyurethane) dual-stage vibration dampening gimbal with silicone gel balls to mechanically isolate the RealSense camera from the frame.

2. Pitfall: Lighting & Low-Texture Feature Starvation
- Issue: In rooms with smooth white drywall and uniform fluorescent lighting, ORB feature detector found fewer than 50 keypoints, causing SLAM failure.
- Solution: Enabled the RealSense active Infrared Dot Projector. The projector casts thousands of invisible pseudo-random IR speckles onto blank walls, creating rich artificial texture detectable by the global-shutter IR cameras even in pitch blackness!

3. Pitfall: Battery Voltage Sag under Heavy Acceleration
- Issue: Rapid throttle punches dropped 4S LiPo voltage from 16.0V to 11.2V, causing the Jetson Orin Nano to brownout and reboot mid-flight.
- Solution: Installed a dedicated high-current Buck-Boost power regulator (capable of outputting steady 12.0V even when input drops to 9.0V) and added a 1000uF low-ESR electrolytic capacitor across the main power bus.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Complete Academic References, GitHub Repository Template & Viva FAQs',
        content: `GITHUB BLUEPRINT, ACADEMIC REFERENCES & DEFENSE VIVA FAQS:

GITHUB REPOSITORY DIRECTORY STRUCTURE:
autonomous-drone-slam/
├── config/              # Camera intrinsics, kalibr YAMLs, PX4 parameters
├── launch/              # ROS 2 XML/Python launch scripts (system_bringup.launch.py)
├── src/
│   ├── drone_slam/      # ORB-SLAM3 stereo-inertial wrapper node
│   ├── drone_mapping/   # OctoMap voxel generator & pointcloud filter
│   ├── drone_planner/   # 3D JPS path planner & minimum snap solver
│   └── drone_control/   # MAVROS offboard bridge & fail-safe supervisor
├── simulation/          # Gazebo world models, SDF drone definitions
├── tests/               # Unit tests, SITL headless integration scripts
├── docs/                # Wiring diagrams, CAD STL files for 3D printing
└── Dockerfile           # Multi-stage GPU-enabled development container

KEY ACADEMIC CITATIONS:
1. Campos, C., Elvira, R., Gómez, J. J., Montiel, J. M., & Tardós, J. D. (2021). "ORB-SLAM3: An Accurate Open-Source Library for Visual, Inertial, and Multi-Map SLAM". IEEE Transactions on Robotics, 37(6), 1874-1890.
2. Hornung, A., Wurm, K. M., Bennewitz, M., Stachniss, C., & Burgard, W. (2013). "OctoMap: An efficient probabilistic 3D mapping framework based on octrees". Autonomous Robots, 34(3), 189-206.
3. Mellinger, D., & Kumar, V. (2011). "Minimum snap trajectory generation and control for quadrotors". IEEE ICRA 2011, 2520-2525.

COMMONLY ASKED VIVA / INTERVIEW QUESTIONS:
Q1: Why did you select Visual SLAM over 3D LiDAR (e.g. Velodyne)?
A1: Payload weight and power constraints. A 3D LiDAR weighs 800g+ and draws 15W, cutting flight time in half. The RealSense D435i weighs only 72g and consumes 2.5W, leaving sufficient payload for edge GPU compute.

Q2: What happens if the companion computer crashes during autonomous flight?
A2: The Pixhawk 6C runs an independent heartbeat monitor. If MAVROS heartbeats cease for > 500ms, the Pixhawk immediately takes over, terminates OFFBOARD mode, and executes an automated fail-safe RTL (Return-To-Launch) or slow vertical parachute descent.`
      }
    ]
  },

  // 2. Distributed Raft Key-Value Store
  {
    id: 'book-proj-raft-kvstore',
    title: 'Distributed Raft-Consensus Key-Value Store & Distributed Lock Manager',
    author: 'Student Engineering Lead: Maya Lin (Distributed Systems & Cloud Computing)',
    category: 'projects',
    badge: 'Top Student Project • Distributed Systems',
    description: 'A fault-tolerant, linearizable distributed key-value store implemented in Go 1.22 from scratch, featuring Raft consensus, log compaction, dynamic cluster membership, and Jepsen chaos verification.',
    coverEmoji: '⚡',
    coverColor: 'from-emerald-600 via-teal-700 to-slate-900',
    totalPages: 10,
    readPages: [],
    projectMetadata: {
      difficulty: 'Capstone',
      domain: 'Distributed Systems, Consensus Protocols & Storage',
      techStack: ['Go 1.22', 'gRPC', 'Protocol Buffers', 'LevelDB', 'Jepsen', 'Docker Compose', 'Prometheus', 'Grafana'],
      timelineWeeks: 12,
      githubRepo: 'https://github.com/cmu-systems-club/raft-distributed-kvstore',
      keyDeliverables: [
        'Pure Go implementation of Raft consensus protocol (Election, Replication, Safety)',
        'Linearizable Client RPC interface with ReadIndex optimization',
        'State machine snapshotting and memory log compaction',
        'Distributed Mutual Exclusion (Lock Manager) with leases',
        'Jepsen test suite validating consistency under network partitions'
      ],
      hardwareRequired: [
        'Standard 3-node or 5-node cluster (can run on AWS EC2 t3.medium or local Docker containers)'
      ]
    },
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Motivation, Strong Consistency Guarantees & Industry Impact',
        content: `PROJECT TITLE: Building a Linearizable Distributed Key-Value Store with Raft Consensus and Distributed Lock Semantics
ACADEMIC DOMAIN: Distributed Systems, Operating Systems, Fault Tolerance
PROJECT TYPE: Senior Capstone / Graduate Systems Project

PROBLEM STATEMENT:
Building scalable internet applications requires coordination across thousands of microservices. How do distributed services agree on leader appointments, configuration flags, and atomic counters when machines crash, network cables are severed, and packet latencies fluctuate unpredictably?

THE SOLUTION:
This project implements a complete, fault-tolerant, linearizable distributed Key-Value store and Distributed Lock Manager from scratch in Go, powered by the Raft consensus algorithm (Diego Ongaro & John Ousterhout, Stanford University).

KEY GUARANTEES IMPLEMENTED:
1. Linearizability: Strongest consistency model. Every read operation returns the result of the most recent write in real time.
2. Fault Tolerance: In an N-node cluster, the system continues serving reads and writes without data loss as long as a majority quorum (ceil((N+1)/2)) remains operational (e.g. 2 nodes can crash in a 5-node cluster).
3. Log Compaction: Periodically snapshots the state machine to disk to prevent logs from growing infinitely.
4. Distributed Lock Leases: Implements TTL-backed mutex locks with fencing tokens preventing zombie split-brain writes.

INDUSTRY ANALOGS:
The architecture mirrors the core foundation of etcd (Kubernetes coordination), HashiCorp Consul, CockroachDB, and TiKV.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Raft Consensus State Machine & Cluster Network Topology',
        content: `RAFT STATE MACHINE & NODE LIFECYCLE:

In Raft, every cluster node exists in one of three mutually exclusive states:
1. Follower: Passive state. Responds to incoming RPCs from leaders and candidates. Resets election timer upon receiving valid heartbeats.
2. Candidate: Transitions here when election timer expires. Increments term and solicits votes from peers.
3. Leader: Wins majority vote. Serves all client requests, appends log entries, and broadcasts heartbeats.

RPC PROTOCOL SPECIFICATION:
- RequestVote RPC: Invoked by candidates to gather votes during elections.
- AppendEntries RPC: Invoked by leader to replicate log entries and serve as periodic keep-alive heartbeats.
- InstallSnapshot RPC: Invoked by leader to send a compacted state machine image to slow or recovering followers.

NETWORK TOPOLOGY:
A 5-node deployment (Nodes S1, S2, S3, S4, S5) communicates over bidirectional gRPC channels over TCP. Each node maintains persistent storage on disk (Write-Ahead Log and Metadata) and an in-memory Key-Value state machine.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Tech Stack & System Requirements (Go 1.22, gRPC, Protobuf, LevelDB)',
        content: `TECHNOLOGY STACK & ARCHITECTURAL CHOICES:

1. Programming Language: Go 1.22
- Rationale: First-class concurrency via goroutines, lightweight channels for lock-free event passing, strong typing, and zero runtime dependency binaries.
- Race Detector: Built-in 'go test -race' was utilized continuously to eliminate subtle concurrent data races.

2. Inter-Node Communication: gRPC & Protocol Buffers v3
- Schema: Defined strictly in .proto files (raft.proto, kvstore.proto).
- Transport: HTTP/2 multiplexing over persistent TCP sockets eliminates handshake latency.

3. Persistent Storage Engine: GoLevelDB / BadgerDB
- Used to persist Raft state (currentTerm, votedFor, and log entries) across machine reboots.

4. Observability & Chaos Testing:
- Prometheus: Exposes metrics on election latency, commit throughput, and log lag.
- Jepsen Framework: Uses Clojure and Docker to simulate chaotic network partitions (nemesis) while verifying linearizability with Knossos checker.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: 12-Week Sprint Implementation Roadmap & Capstone Milestones',
        content: `12-WEEK SYSTEM DEVELOPMENT SPRINT ROADMAP:

WEEK 1-2: RPC SKELETON & PROTOBUF DEFINITIONS
- Draft raft.proto message specifications for RequestVote, AppendEntries, and ClientService.
- Scaffold Go package layout (raft, storage, kv, server).
- Implement persistent storage interface using disk-backed LevelDB.

WEEK 3-4: LEADER ELECTION & HEARTBEAT ENGINE
- Implement randomized election timers (150ms - 300ms) to prevent split votes.
- Implement RequestVote request and response logic.
- Conduct election stability tests with single and multiple node kills.

WEEK 5-6: LOG REPLICATION & INVARIANT ENFORCEMENT
- Implement AppendEntries RPC handling and log consistency matching rules.
- Maintain commitIndex and lastApplied pointers across all nodes.
- Test client write operations with dropped packets.

WEEK 7-8: STATE MACHINE PERSISTENCE & SNAPSHOTTING
- Integrate key-value state machine (Get, Put, Append, Delete).
- Implement log compaction when log exceeds 10,000 entries.
- Implement InstallSnapshot RPC to bootstrap lagging nodes.

WEEK 9-10: DISTRIBUTED LOCK MANAGER & LEASE SYSTEM
- Implement Lock(key, ttl) and Unlock(key) with auto-renewing leases.
- Generate monotonically increasing fencing tokens to defeat zombie clients.

WEEK 11-12: JEPSEN TESTING, BENCHMARKING & PRESENTATION
- Write Jepsen test suite to inject network splits (split-brain, bridge partitions).
- Benchmark throughput: Achieved 18,500 write operations/sec on a 3-node cluster.
- Final capstone defense documentation and video demo.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Leader Election, Heartbeats & Split-Vote Handling Implementation',
        content: `LEADER ELECTION LOGIC (raft/election.go):

\`\`\`go
package raft

import (
  "math/rand"
  "sync/atomic"
  "time"
)

func (rf *Raft) startElection() {
  rf.mu.Lock()
  rf.state = Candidate
  rf.currentTerm++
  rf.votedFor = rf.me
  rf.persist()
  currentTerm := rf.currentTerm
  lastLogIndex := rf.log.lastIndex()
  lastLogTerm := rf.log.lastTerm()
  rf.resetElectionTimer()
  rf.mu.Unlock()

  var votesReceived int32 = 1 // Vote for self

  for peer := range rf.peers {
    if peer == rf.me {
      continue
    }
    go func(peerId int) {
      args := &RequestVoteArgs{
        Term:         currentTerm,
        CandidateId:  rf.me,
        LastLogIndex: lastLogIndex,
        LastLogTerm:  lastLogTerm,
      }
      reply := &RequestVoteReply{}
      if rf.sendRequestVote(peerId, args, reply) {
        rf.mu.Lock()
        defer rf.mu.Unlock()

        if reply.Term > rf.currentTerm {
          rf.becomeFollower(reply.Term)
          return
        }
        if rf.state == Candidate && reply.VoteGranted && reply.Term == rf.currentTerm {
          newVotes := atomic.AddInt32(&votesReceived, 1)
          if int(newVotes) > len(rf.peers)/2 {
            rf.becomeLeader()
          }
        }
      }
    }(peer)
  }
}

func (rf *Raft) resetElectionTimer() {
  // Randomize between 150ms and 300ms to prevent split-vote deadlocks
  d := time.Duration(150+rand.Intn(150)) * time.Millisecond
  rf.electionTimer.Reset(d)
}
\`\`\``
      },
      {
        pageNumber: 6,
        title: 'Page 6: Log Replication, Commit Index & Safety Invariant Proofs',
        content: `LOG REPLICATION INVARIANTS & SAFETY GUARANTEES:

Raft guarantees five core safety properties:
1. Election Safety: At most one leader can be elected in a given term.
2. Leader Append-Only: A leader never overwrites or truncates its own log entries; it only appends new entries.
3. Log Matching Property: If two logs contain an entry with the same index and term, then they are identical in all entries up through the given index.
4. Leader Completeness: If a log entry is committed in a given term, that entry will be present in the logs of the leaders for all higher-numbered terms.
5. State Machine Safety: If a server has applied a log entry at a given index to its state machine, no other server will ever apply a different log entry for the same index.

THE LOG MATCHING ALGORITHM:
When a leader sends AppendEntries RPC to follower F:
- Args include prevLogIndex and prevLogTerm.
- Follower checks: Does my log contain an entry at prevLogIndex with term prevLogTerm?
  - If NO: Follower rejects RPC. Leader decrements nextIndex[F] and retries.
  - If YES: Follower appends new entries, overwriting any conflicting uncommitted entries.
Once a majority of followers acknowledge entry K, the leader advances commitIndex and applies entry K to its local key-value state machine.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Log Compaction, Memory Snapshots & Dynamic Membership Reconfiguration',
        content: `LOG COMPACTION & INSTALLSNAPSHOT RPC:

The Challenge of Memory Bloat:
In a 24/7 production system, millions of write operations cause log files to grow into gigabytes. Storing millions of redundant 'SET x = 1', 'SET x = 2' operations wastes disk and slows down recovery replay.

Snapshot Architecture:
When log length exceeds a threshold (e.g. 5,000 entries), the server creates a compact state machine image (e.g. current map[string]string) and writes it to disk alongside the snapshot metadata:
- lastIncludedIndex: Highest log index covered by snapshot.
- lastIncludedTerm: Term of lastIncludedIndex.
All log entries up to lastIncludedIndex are discarded from memory!

Catching Up Slow Followers (InstallSnapshot RPC):
If Follower F was disconnected for hours, its nextIndex may lag behind the leader's earliest log entry.
- The leader cannot send missing logs because they were purged during compaction.
- The leader transmits the snapshot file in chunks via InstallSnapshot RPC.
- Follower F writes snapshot to disk, replaces its state machine, and resets its log to resume normal streaming.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: gRPC API Schema, Client SDK & Distributed Lock Semantics',
        content: `DISTRIBUTED LOCK MANAGER & FENCING TOKENS:

Distributed Mutex API:
Clients acquire and release locks over gRPC:
- Lock(resourceKey, ttlSeconds, clientId) -> { granted: bool, fencingToken: int64 }
- Unlock(resourceKey, clientId) -> { success: bool }

THE ZOMBIE CLIENT PROBLEM & FENCING TOKENS:
Consider Client A acquiring Lock("payment_queue"). Client A encounters a 10-second JVM garbage collection pause. The lock lease expires, and Client B acquires the lock. Client A wakes up from GC pause, believes it still holds the lock, and issues a write, corrupting storage!

The Fencing Token Solution:
Every successful Lock() grant increments a cluster-wide monotonically increasing integer: a Fencing Token.
- Client A receives Token = 101.
- Lease expires. Client B acquires lock and receives Token = 102.
- Client B writes data to database with token 102.
- Client A wakes up and attempts write with token 101. The database rejects the write because 101 < 102! This mathematically eliminates zombie split-brain writes.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Jepsen Fault-Injection Testing, Network Partitions & Chaos Engineering',
        content: `JEPSEN CHAOS VERIFICATION & FAULT TOLERANCE TESTING:

We deployed the Kyle Kingsbury Jepsen test framework to rigorously stress test our Raft implementation under hostile network conditions.

TEST SCENARIOS EXECUTED:
1. Majority Partition (3 vs 2 split):
   - Nodes S1, S2, S3 partitioned from S4, S5.
   - Result: Majority partition (S1-S3) elected leader and continued serving reads and writes. Minority partition (S4-S5) rejected client writes. When partition healed, S4 and S5 rejoined without data loss.

2. Bridge Partition:
   - S1 can talk to S2, S2 can talk to S3, but S1 cannot talk to S3.
   - Verified that election timers handled asymmetric connectivity without thrashing.

3. Process Kill & Disk Latency Injections:
   - Randomly sent SIGKILL to the active leader every 5 seconds.
   - Re-election succeeded within 280ms average.
   - Knossos linearizability checker validated zero dirty reads or stale writes across 500,000 operations!`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Performance Benchmarks, GitHub Repo Blueprint, References & Interview Questions',
        content: `PROJECT BLUEPRINT, CITATIONS & INTERVIEW QUESTIONS:

GITHUB REPOSITORY STRUCTURE:
raft-distributed-kvstore/
├── proto/              # raft.proto, kv.proto schemas
├── pkg/
│   ├── raft/           # Core Raft state machine (election, log, snapshot)
│   ├── storage/        # LevelDB disk persistence & WAL
│   ├── kvstore/        # In-memory hash state machine
│   └── lockmgr/        # Distributed lock leases & fencing tokens
├── cmd/
│   ├── server/         # Raft node binary with CLI flags
│   └── client/         # Client CLI and SDK
├── tests/
│   ├── unit_test.go    # Test2A, Test2B, Test2C (MIT 6.824 test harness)
│   └── jepsen/         # Clojure chaos injection scripts
└── docker-compose.yml  # 5-node test cluster with Prometheus & Grafana

KEY ACADEMIC REFERENCES:
1. Ongaro, D., & Ousterhout, J. (2014). "In Search of an Understandable Consensus Algorithm". USENIX ATC 2014, 305-319.
2. Lamport, L. (1998). "The Part-Time Parliament". ACM Transactions on Computer Systems (TOCS), 16(2), 133-169.
3. Kleppmann, M. (2017). "Designing Data-Intensive Applications". O'Reilly Media.

TOP INTERVIEW / VIVA QUESTIONS:
Q1: How does Raft prevent two leaders from being elected simultaneously?
A1: A candidate requires votes from a strict majority (N/2 + 1) of nodes. Two majorities in any cluster must overlap by at least one node. Because each node can cast at most one vote per term, it is mathematically impossible for two candidates to receive a majority in the same term.

Q2: What is the ReadIndex optimization for linearizable reads?
A2: Rather than committing an AppendEntries log entry for every read query (which incurs disk I/O), the leader records its current commitIndex, exchanges a fast heartbeat round with followers to verify it is still the legitimate leader, and serves the read from memory once its state machine reaches that index.`
      }
    ]
  },

  // 3. AI Medical Imaging Diagnostic Pipeline
  {
    id: 'book-proj-medical-ai',
    title: 'AI-Powered Medical Diagnostic & Pathology Scanner (Chest X-Ray & MRI Segmentation)',
    author: 'Student Engineering Lead: Dr. Sophia Al-Mansoor (Biomedical Informatics)',
    category: 'projects',
    badge: 'Top Student Project • HealthTech AI',
    description: 'An end-to-end clinical AI pipeline for pathology detection (Pneumonia, Tuberculosis, Cardiomegaly) and 3D brain tumor MRI segmentation using PyTorch, MONAI, Vision Transformers, and FastAPI.',
    coverEmoji: '🔬',
    coverColor: 'from-rose-600 via-pink-700 to-slate-900',
    totalPages: 10,
    readPages: [],
    projectMetadata: {
      difficulty: 'Capstone',
      domain: 'Deep Learning, Medical Computer Vision & Healthcare',
      techStack: ['PyTorch 2.3', 'MONAI', 'FastAPI', 'React', 'TorchVision', 'DICOM (pydicom)', 'Docker', 'CUDA'],
      timelineWeeks: 12,
      githubRepo: 'https://github.com/stanford-aimi-student/medical-imaging-diagnostic',
      keyDeliverables: [
        '14-class chest X-ray pathology classifier achieving 0.892 AUC-ROC',
        '3D U-Net brain tumor segmentation pipeline on BraTS 2023 dataset',
        'Grad-CAM explainable AI saliency visualizer for radiologist review',
        'HIPAA-compliant de-identification & DICOM web microservice',
        'Interactive clinical review dashboard with synchronized slice view'
      ],
      hardwareRequired: [
        'NVIDIA RTX 3090 / 4090 or Google Cloud A100 GPU instance for model training',
        'Web browser for clinical diagnostic workstation'
      ]
    },
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Clinical Problem, Dataset Curation (NIH ChestX-ray14) & Ethics',
        content: `PROJECT TITLE: Deep Learning Diagnostic Decision Support System for Thoracic Pathology Classification and Volumetric MRI Segmentation
ACADEMIC DOMAIN: Artificial Intelligence, Medical Imaging, Clinical Decision Support
PROJECT TYPE: Senior Capstone / HealthTech Thesis

THE CLINICAL CHALLENGE:
Radiologist shortages worldwide cause critical delays in diagnosing thoracic pathologies such as pneumonia, pleural effusion, and early-stage pulmonary nodules. In rural and developing regions, patient-to-radiologist ratios can exceed 100,000:1. Computer-aided diagnostic systems can triage urgent scans, detect subtle anomalies, and outline tumor margins with millimeter precision.

PROJECT OBJECTIVES:
1. Multi-Label Thoracic Classification: Classify 14 distinct lung pathologies on Chest X-Rays (NIH ChestX-ray14 dataset, 112,120 frontal-view X-rays of 30,805 unique patients).
2. Volumetric 3D MRI Segmentation: Segment brain tumor sub-regions (enhancing tumor, edema, necrotic core) on multimodal 3D MRIs (BraTS dataset) using 3D U-Net.
3. Clinical Explainability: Generate Grad-CAM heatmaps to visually justify AI diagnostic suggestions to attending physicians.
4. Privacy & Compliance: Implement DICOM patient de-identification conforming to HIPAA Safe Harbor standards.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Deep Learning Pipeline Architecture (Vision Transformers & U-Net)',
        content: `NEURAL NETWORK ARCHITECTURES & MODEL TOPOLOGY:

1. Chest X-Ray Classifier (DenseNet-121 + Swin Transformer):
- DenseNet-121 Backbone: Dense connectivity pattern where each layer receives feature maps from all preceding layers: x_l = H_l([x_0, x_1, ..., x_{l-1}]). Reuses feature representations and prevents vanishing gradients on fine medical textures.
- Multi-Label Classification Head: Replaces standard softmax with 14 independent sigmoid outputs (P(y_i = 1 | x) = 1 / (1 + e^{-z_i})), allowing simultaneous diagnosis of co-occurring conditions (e.g. Pneumonia + Infiltration).

2. 3D MRI Volumetric Segmenter (MONAI DynUNet):
- Input: 4-channel 3D volume (128 x 128 x 128 voxels): T1, T1-contrast, T2, and FLAIR MRI modalities.
- Architecture: 3D encoder-decoder network with residual skip connections and deep supervision.
- Output: 3 binary masks (Whole Tumor, Tumor Core, Active Enhancing Tumor).`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Full-Stack Tech Stack (PyTorch, MONAI, FastAPI, React, DICOM Web)',
        content: `SYSTEM ARCHITECTURE & SOFTWARE STACK:

1. Deep Learning Frameworks:
- PyTorch 2.3: Core training and model serialization (TorchScript / ONNX).
- MONAI (Medical Open Network for AI): Specialized medical data loaders, spatial 3D affine transformations, and Dice loss metrics.

2. Medical Imaging Formats & Utilities:
- pydicom: Parses binary DICOM (.dcm) files and extracts photometric metadata.
- SimpleITK & NiBabel: Handles 3D NIfTI (.nii.gz) spatial orientations and voxel spacing normalization.

3. Backend API Service:
- FastAPI (Python 3.11): High-performance asynchronous REST microservice with automated OpenAPI documentation.
- Redis Queue (Celery): Offloads GPU inference tasks asynchronously, returning job status tokens to prevent HTTP request timeouts during long 3D segmentations.

4. Clinical Frontend:
- React + Tailwind CSS: Interactive medical viewer.
- CornerstoneJS: Specialized web DICOM viewer supporting windowing (WL/WW), zooming, and measurement calipers.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: 12-Week Sprint Implementation Roadmap & Clinical Validation',
        content: `12-WEEK DEVELOPMENT & CLINICAL VALIDATION ROADMAP:

WEEK 1-2: DATA CURATION, HIPAA DE-IDENTIFICATION & EXPLORATION
- Download NIH ChestX-ray14 (42 GB) and BraTS 2023 datasets.
- Strip Protected Health Information (PHI): Patient Name, MRN, Birthdate from DICOM headers.
- Analyze class imbalance (Pneumonia: 1.2%, Normal: 53.6%).

WEEK 3-4: PREPROCESSING & DATA AUGMENTATION PIPELINE
- Implement CLAHE (Contrast Limited Adaptive Histogram Equalization).
- Resize images to 512x512 while preserving aspect ratio with zero-padding.
- Author spatial augmentations (RandomAffine, ElasticTransform, GaussianBlur).

WEEK 5-6: CLASSIFICATION MODEL TRAINING & HYPERPARAMETER TUNING
- Train DenseNet-121 and Swin-B on dual NVIDIA A100 GPUs using PyTorch Lightning.
- Implement Weighted BCE Loss and Focal Loss to combat severe class imbalance.
- Evaluate AUC-ROC curves across all 14 disease classes.

WEEK 7-8: 3D SEGMENTATION & MONAI INTEGRATION
- Train 3D UNet with sliding-window inference on 3D MRI brain volumes.
- Optimize soft Dice Loss + Cross-Entropy joint objective function.
- Measure volumetric Dice Similarity Coefficient (DSC).

WEEK 9-10: EXPLAINABLE AI (GRAD-CAM) & FASTAPI BACKEND
- Implement PyTorch Grad-CAM hook on last convolutional layer.
- Build FastAPI endpoints for /api/predict/xray and /api/segment/mri.

WEEK 11-12: WORKSTATION FRONTEND, BENCHMARKS & REPORT
- Connect React CornerstoneJS frontend to inference endpoints.
- Conduct blind evaluation with resident radiologist.
- Final thesis defense documentation and open-source release.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Data Preprocessing, CLAHE Normalization & Augmentation',
        content: `IMAGE PREPROCESSING & DATA AUGMENTATION PIPELINE:

1. Dynamic Range Normalization & CLAHE:
Raw X-rays often suffer from overexposure and underpenetration.
- CLAHE divides the image into 8x8 contextual tiles.
- Computes local histograms and clips histogram peaks above a clip-limit (2.0) to avoid over-amplifying background sensor noise.
- Bilinearly interpolates across tile boundaries to eliminate artificial seams.

2. Heavy Data Augmentation (Albumentations):
To prevent overfitting on clinical site-specific artifacts (e.g. distinct hospital lead markers):
- Random Horizontal Flip (p = 0.5) (Chest anatomy is roughly bilateral, except heart cardiac silhouette).
- Random Rotation (-10 to +10 degrees) to simulate slight patient tilt.
- Random Color Jitter (Brightness +/- 15%, Contrast +/- 15%).
- Cutout / CoarseDropout: Erases random rectangular patches (16x16) to force the network to rely on multiple dispersed pathological cues.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Model Training, Focal Loss, AdamW & Mixed-Precision Optimization',
        content: `LOSS FUNCTION FORMULATION & TRAINING CODE (train_classifier.py):

\`\`\`python
import torch
import torch.nn as nn
from torchvision.models import densenet121, DenseNet121_Weights

class MedicalDenseNet(nn.Module):
    def __init__(self, num_classes=14):
        super().__init__()
        weights = DenseNet121_Weights.DEFAULT
        self.backbone = densenet121(weights=weights)
        in_features = self.backbone.classifier.in_features
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(in_features, num_classes)
        )
    
    def forward(self, x):
        return self.backbone(x)

# Asymmetric Focal Loss for extreme medical class imbalance
class AsymmetricFocalLoss(nn.Module):
    def __init__(self, gamma_pos=1.0, gamma_neg=4.0, clip=0.05):
        super().__init__()
        self.gamma_pos = gamma_pos
        self.gamma_neg = gamma_neg
        self.clip = clip

    def forward(self, logits, targets):
        p = torch.sigmoid(logits)
        # Shift probabilities to suppress negative class loss
        p_sub = (p - self.clip).clamp(min=0.0)
        
        pos_loss = targets * ((1 - p) ** self.gamma_pos) * torch.log(p.clamp(min=1e-8))
        neg_loss = (1 - targets) * (p_sub ** self.gamma_neg) * torch.log((1 - p_sub).clamp(min=1e-8))
        
        return -torch.mean(pos_loss + neg_loss)
\`\`\`

OPTIMIZATION DETAILS:
- Optimizer: AdamW (Initial Learning Rate 1e-4, Weight Decay 1e-2).
- Scheduler: CosineAnnealingLR with 5-epoch warm-up.
- Mixed Precision: PyTorch torch.cuda.amp.autocast() enabled 2.4x training speedup on Tensor Cores with zero loss in validation accuracy.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Explainable AI with Grad-CAM Heatmap Generation & Saliency Maps',
        content: `EXPLAINABLE AI & GRAD-CAM MATHEMATICAL MECHANISM:

Why "Black Box" Deep Learning Fails Clinical Adoption:
Physicians cannot prescribe invasive therapies based solely on a high AI probability score. They need to verify that the model is looking at the actual consolidation in the right lower lung lobe, rather than an artifact or hospital pacemaker tag!

Grad-CAM (Gradient-Weighted Class Activation Mapping):
Computes the gradient of the score for target class c (y_c) with respect to feature activation maps A^k of the final convolutional layer:

1. Neuron Importance Weights:
alpha_k^c = (1 / Z) * sum_i sum_j (partial y_c / partial A_{i, j}^k)

2. Weighted Heatmap Combination:
L_{Grad-CAM}^c = ReLU(sum_k alpha_k^c * A^k)

The ReLU operator ensures that only features that exert a POSITIVE influence on the target pathology are highlighted, filtering out negative correlates. The resulting heatmap is bilinearly upsampled to the original 512x512 resolution and overlaid in transparent jet colormap atop the medical scan.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Production FastAPI Microservice & HIPAA-Compliant Architecture',
        content: `PRODUCTION FASTAPI INFERENCE MICROSERVICE (app/main.py):

\`\`\`python
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import io
from PIL import Image
import numpy as np

app = FastAPI(title="SmartLearn AI Diagnostic Assistant", version="1.0.0")

CLASSES = [
    "Atelectasis", "Cardiomegaly", "Effusion", "Infiltration", "Mass",
    "Nodule", "Pneumonia", "Pneumothorax", "Consolidation", "Edema",
    "Emphysema", "Fibrosis", "Pleural_Thickening", "Hernia"
]

@app.post("/api/diagnose/xray")
async def diagnose_chest_xray(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image file")
    
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Preprocess
    tensor = transform_pipeline(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        logits = model(tensor)
        probs = torch.sigmoid(logits).squeeze().cpu().numpy()
    
    findings = []
    for idx, prob in enumerate(probs):
        if prob > 0.35: # Clinical triage threshold
            findings.append({
                "pathology": CLASSES[idx],
                "confidence": float(prob),
                "severity": "High" if prob > 0.70 else "Moderate"
            })
    
    # Generate Grad-CAM for highest probability finding
    cam_base64 = generate_cam_overlay(tensor, np.argmax(probs))
    
    return {
        "status": "success",
        "findings": findings,
        "heatmap": cam_base64,
        "reviewRecommendation": "Prioritized for Urgent Radiologist Review" if len(findings) > 0 else "Routine"
    }
\`\`\``
      },
      {
        pageNumber: 9,
        title: 'Page 9: Clinical Evaluation Metrics (AUC-ROC, Dice Similarity, F1-Score)',
        content: `CLINICAL PERFORMANCE EVALUATION & BENCHMARKS:

Evaluation Dataset: CheXpert and NIH ChestX-ray14 independent test sets (20,000 images).

Pathology Classification AUC-ROC Results:
- Cardiomegaly: 0.912 AUC (Exceeds average junior resident baseline of 0.885)
- Pneumothorax: 0.884 AUC
- Pneumonia: 0.871 AUC
- Pleural Effusion: 0.923 AUC
- Pulmonary Mass / Nodule: 0.845 AUC
- Mean Average AUC across 14 classes: 0.892 AUC

3D Brain Tumor MRI Segmentation (BraTS 2023):
- Whole Tumor (WT) Dice Score: 0.914
- Tumor Core (TC) Dice Score: 0.878
- Enhancing Tumor (ET) Dice Score: 0.832
- 95% Hausdorff Distance (HD95): 3.2 mm (indicating sub-voxel boundary alignment).

CLINICAL TRIAGE IMPACT:
Simulated clinical deployment reduced average triage turnaround time for critical pneumothorax (collapsed lung) cases from 4.2 hours down to 8.5 minutes!`
      },
      {
        pageNumber: 10,
        title: 'Page 10: GitHub Repo Structure, Academic References, Dataset Links & Viva FAQs',
        content: `GITHUB REPO BLUEPRINT, REFERENCES & DEFENSE VIVA FAQS:

REPOSITORY BLUEPRINT:
medical-imaging-diagnostic/
├── data/               # Scripts to fetch NIH ChestX-ray14 & BraTS data
├── src/
│   ├── models/         # DenseNet, Swin Transformer, MONAI 3D DynUNet
│   ├── losses/         # Asymmetric Focal Loss, Soft Dice Loss
│   ├── explain/        # Grad-CAM and Integrated Gradients implementations
│   └── pipeline/       # DICOM parsing, de-identification & CLAHE transforms
├── api/                # FastAPI application & Celery GPU worker
├── frontend/           # React + Tailwind + CornerstoneJS DICOM viewer
├── notebooks/          # Exploratory analysis & ROC curve plotting
└── Dockerfile          # CUDA 12.1 runtime image

PRIMARY ACADEMIC CITATIONS:
1. Rajpurkar, P., et al. (2017). "CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning". arXiv:1711.05225.
2. Wang, X., et al. (2017). "ChestX-ray8: Hospital-scale Chest X-ray Database and Benchmarks". IEEE CVPR 2017.
3. Isensee, F., et al. (2021). "nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation". Nature Methods, 18(2), 203-211.

COMMONLY ASKED VIVA / DEFENSE QUESTIONS:
Q1: Why use Asymmetric Focal Loss instead of standard Binary Cross-Entropy?
A1: Positive disease samples account for less than 2% of the dataset. Standard BCE is overwhelmed by easy negative (normal) examples. Asymmetric Focal Loss applies an exponential decay factor (gamma = 4.0) to easy negatives, concentrating gradient updates strictly on hard-to-detect diseased samples.

Q2: How is patient privacy guaranteed?
A2: The preprocessing ingest pipeline automatically wipes all DICOM Group 0x0010 tags (Patient Name, ID, Age, Address) in memory before any data touches persistent storage or GPU memory.`
      }
    ]
  },

  // 4. Real-time Collaborative Cloud IDE
  {
    id: 'book-proj-cloud-ide',
    title: 'Real-Time Collaborative Cloud IDE with WebAssembly & CRDT Synchronization',
    author: 'Student Engineering Lead: Marcus Vance (Cloud Architecture & Systems)',
    category: 'projects',
    badge: 'Top Student Project • Full-Stack Systems',
    description: 'A Google Docs-style real-time collaborative code editor with Yjs CRDT synchronization, WebRTC peer audio/video mesh, and secure sandboxed code execution in isolated Docker micro-containers.',
    coverEmoji: '💻',
    coverColor: 'from-violet-600 via-purple-700 to-slate-900',
    totalPages: 10,
    readPages: [],
    projectMetadata: {
      difficulty: 'Capstone',
      domain: 'Full-Stack Web Systems, Concurrency & Distributed State',
      techStack: ['TypeScript', 'React 18', 'Node.js', 'WebSockets', 'Yjs (CRDT)', 'Monaco Editor', 'Docker', 'WebRTC'],
      timelineWeeks: 12,
      githubRepo: 'https://github.com/berkeley-eecs/collaborative-cloud-ide',
      keyDeliverables: [
        'Multiplayer code editor powered by Monaco Editor and Yjs CRDTs',
        'Sub-50ms peer-to-peer cursor presence and selection highlighting',
        'Secure isolated Docker sandbox executing Python, C++, Go, and Node.js',
        'WebRTC mesh for peer audio/video calling without central media server',
        'Project file tree synchronization and real-time terminal (xterm.js)'
      ],
      hardwareRequired: [
        'Cloud VPS (Ubuntu 22.04 with Docker Engine installed) or local development workstation'
      ]
    },
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Project Vision, Collaborative Concurrency & Google Docs Analogy',
        content: `PROJECT TITLE: Architecture of a Real-Time Collaborative Cloud IDE with Conflict-Free Replicated Data Types (CRDTs) and Sandboxed Container Execution
ACADEMIC DOMAIN: Web Systems, Distributed State Synchronization, Concurrency
PROJECT TYPE: Senior Capstone / Full-Stack Systems Thesis

THE PROBLEM:
Software development is inherently collaborative. Traditional pair programming requires screen-sharing where only one engineer can type at a time. Modern cloud IDEs (Replit, GitHub Codespaces) enable multiple developers to edit the same file simultaneously. However, coordinating concurrent edits over high-latency networks without locking files or dropping keystrokes is a notoriously difficult distributed computing challenge.

PROJECT OBJECTIVES:
1. Multiplayer Code Editing: Zero-conflict real-time collaborative editing using Yjs CRDTs and Monaco Editor.
2. Cursor & Presence Awareness: Real-time multi-colored user cursors and text selection tracking at 60 FPS.
3. Remote Sandboxed Code Runner: Execute untrusted user code (Python, C++, Node.js) inside isolated Linux Docker containers with strict cgroup limits (CPU, memory, no network).
4. Interactive Terminal: Stream pseudo-terminal (PTY) I/O bidirectionally over WebSockets via xterm.js.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: System Architecture: WebSockets, Yjs CRDTs & Docker Sandbox Daemon',
        content: `HIGH-LEVEL SYSTEM ARCHITECTURE & TOPOLOGY:

1. Client Tier (Browser):
- Monaco Editor (The core of VS Code) integrated with y-monaco binding.
- Local Yjs Document: Maintains an in-memory replicated state machine. User keystrokes mutate the local CRDT immediately (0ms local latency) and emit binary delta updates.
- xterm.js: Full VT100 terminal emulator in the browser.

2. Gateway & Synchronization Server (Node.js + WebSockets):
- y-websocket server: Acts as a lightweight relay hub.
- Receives binary update deltas and broadcasts them to all connected peers in the workspace room.
- Periodically persists document state to Redis / PostgreSQL.

3. Sandbox Execution Engine:
- Docker Daemon Controller: Spawns ephemeral containers with 512MB RAM, 1 CPU core, and read-only root filesystems.
- PTY Bridge: Uses node-pty to spawn bash sessions inside containers and pipe STDIN/STDOUT directly to user terminals.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Tech Stack Matrix (TypeScript, React, Node.js, WebRTC, Docker, Redis)',
        content: `TECH STACK MATRIX & RATIONALE:

- Frontend UI: React 18, Tailwind CSS, Lucide Icons, Monaco Editor (VS Code core).
- Synchronization Engine: Yjs (fastest CRDT implementation in JavaScript/Wasm, 10x faster than Automerge).
- Network Protocol: WebSockets (wss://) with lib0 binary encoding for minimal payload overhead.
- Peer Collaboration: WebRTC Mesh (simple-peer) for zero-latency peer audio calls without paying for expensive central SFU media servers.
- Sandbox Isolation: Docker API with gVisor / runc runtime, Linux cgroups v2, and seccomp syscall filters.
- State Persistence: Redis (real-time session presence) + PostgreSQL (user auth, workspace files).`
      },
      {
        pageNumber: 4,
        title: 'Page 4: 12-Week Milestone Roadmap from Single-User to Multi-Tenant Sandbox',
        content: `12-WEEK IMPLEMENTATION ROADMAP:

WEEK 1-2: MONACO EDITOR & WEBSOCKET SKELETON
- Mount Monaco Editor inside React container; configure syntax highlighting for 15 languages.
- Set up Node.js WebSocket server with room-based multiplexing.

WEEK 3-4: CRDT ENGINE (YJS) INTEGRATION
- Bind Y.Text CRDT to Monaco Editor model using y-monaco.
- Verify two browser tabs can type simultaneously without character collisions or cursor jumping.

WEEK 5-6: AWARENESS PROTOCOL & PRESENCE
- Implement Yjs Awareness protocol.
- Broadcast user name, color, cursor line/column, and selection ranges.
- Render smooth animated cursor flags for peer developers.

WEEK 7-8: DOCKER SANDBOX & CODE EXECUTION ENGINE
- Build Docker images with pre-installed toolchains (gcc 12, python 3.11, node 20, go 1.22).
- Implement execution daemon enforcing: ulimit -t 10 (10s CPU limit), -m 512m (RAM limit), --network none.

WEEK 9-10: WEB TERMINAL (XTERM.JS) & PTY STREAMING
- Integrate xterm.js with WebSocket stream.
- Connect terminal to container PTY via node-pty.

WEEK 11-12: WEBRTC VOICE CHAT, LOAD TESTING & CAPSTONE DEFENSE
- Implement WebRTC mesh for peer-to-peer voice and webcam bubbles.
- Conduct stress tests with 1,000 simulated typing bots using k6.
- Final capstone demonstration and documentation.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: CRDT (Conflict-Free Replicated Data Types) Theory & Yjs Integration',
        content: `CRDT MATHEMATICAL FORMULATION & YJS INTERNALS:

Why Operational Transformation (OT) Failed:
Google Docs uses Operational Transformation (OT). OT requires a central authoritative server to transform character offsets. If two users type at position 5 simultaneously, the server shifts offsets. However, OT is difficult to implement, fails in peer-to-peer topologies, and does not scale well to decentralized systems.

Conflict-Free Replicated Data Types (CRDTs):
A State-based or Operation-based CRDT guarantees Strong Eventual Consistency (SEC): any two nodes that have received the same set of updates (regardless of arrival order) are mathematically guaranteed to converge to the exact same text document without coordination!

Yjs StructStore & Relative Pointers:
Yjs models text as a doubly linked list of Item structs:
- Each item has a globally unique ID: (ClientID, Clock).
- Insertion does not use absolute character indices. Instead, an item specifies its left and right neighbors: Item(origin, left, right, content).
- If two clients insert between the same neighbors, Yjs breaks ties deterministically using ClientID comparison.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Secure Code Execution Engine (Isolated Docker Containers & cgroup Limits)',
        content: `CONTAINER SANDBOX ISOLATION & DEFENSE MECHANISMS (backend/sandbox.ts):

\`\`\`typescript
import Docker from 'dockerode';
import { spawn } from 'child_process';

const docker = new Docker();

export async function runUntrustedCode(language: string, code: string): Promise<string> {
  const imageName = getLanguageImage(language); // e.g. "sandbox-python:latest"
  
  // Security Hardening Parameters
  const container = await docker.createContainer({
    Image: imageName,
    Cmd: ['/bin/sh', '-c', 'echo ' + Buffer.from(code).toString('base64') + ' | base64 -d > /app/main && timeout 10s run_code'],
    NetworkDisabled: true, // Complete network isolation (prevents crypto-mining / botnets)
    HostConfig: {
      Memory: 512 * 1024 * 1024,      // 512 MB Hard Limit
      MemorySwap: 512 * 1024 * 1024,  // Disable swap to prevent disk thrashing
      NanoCpus: 1000000000,           // 1.0 CPU Core Limit
      PidsLimit: 50,                  // Prevents fork-bomb denial of service attacks
      ReadonlyRootfs: true,           // Root filesystem is strictly read-only
      Binds: ['/tmp/sandbox_scratch:/app:rw'], // Writable RAM scratchpad
      CapDrop: ['ALL'],               // Drop all Linux capabilities (no root privileges)
    }
  });

  await container.start();
  const logs = await container.logs({ stdout: true, stderr: true, follow: true });
  await container.wait();
  await container.remove({ force: true });

  return logs.toString('utf8');
}
\`\`\``
      },
      {
        pageNumber: 7,
        title: 'Page 7: Real-time Audio/Video Mesh with WebRTC Peer-to-Peer Signaling',
        content: `WEBRTC PEER-TO-PEER AUDIO/VIDEO MESH:

Pair programming is significantly enhanced by voice communication.

Signaling Protocol over Existing WebSockets:
1. User A joins workspace room -> Server notifies User B.
2. User A creates WebRTC SDP Offer -> sends to server over WebSocket.
3. Server relays SDP Offer to User B.
4. User B receives offer, generates SDP Answer -> sends back to User A.
5. Both peers exchange ICE Candidates (public IP/port candidates discovered via Google STUN servers: stun:stun.l.google.com:19302).
6. Direct peer-to-peer UDP media channel is established. Audio/video streams flow directly between developers' laptops with sub-30ms latency, zero server bandwidth cost!`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Database Schema, Project File Trees & Permission Access Control',
        content: `DATABASE SCHEMA & WORKSPACE ENTITIES:

PostgreSQL Schema:
- users: id, email, password_hash, display_name, avatar_url.
- workspaces: id, owner_id, title, visibility ('public' | 'private'), created_at.
- workspace_collaborators: workspace_id, user_id, role ('owner' | 'editor' | 'viewer').
- files: id, workspace_id, file_path, is_directory, parent_id, updated_at.

File Tree Virtualization:
The file explorer displays thousands of nested project files without DOM lag. We implemented virtualized tree nodes in React using react-window. Opening a file instantiates an active Yjs sub-document in memory, streaming changes to active editors while keeping unopened files dormant on disk.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Load Testing (1,000 Concurrent Typists) with k6 & Latency Optimization',
        content: `PERFORMANCE BENCHMARKING & K6 LOAD TESTING:

We authored a distributed load test in k6 simulating 1,000 concurrent typists in 100 active workspace rooms:

Test Metrics:
- Keystroke-to-Peer Broadcast Latency: Mean 24ms, 99th percentile 62ms across US-East and US-West nodes.
- Memory Usage on WebSocket Gateway: Scaled linearly at ~42 KB per connected user (Node.js handling 10,000 concurrent sockets on a single 4GB RAM cloud instance).
- CPU Usage during Code Execution: Docker cgroups successfully throttled infinite-loop attacks ('while True: pass') to exactly 100% of 1 core without impacting neighboring containers.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Deployment Guide (Kubernetes), GitHub Repository Template, References & FAQs',
        content: `GITHUB BLUEPRINT, CITATIONS & DEFENSE VIVA FAQS:

REPOSITORY BLUEPRINT:
collaborative-cloud-ide/
├── client/             # React 18, Monaco Editor, Yjs bindings, Tailwind
├── server/             # Node.js WebSocket gateway, Yjs sync provider
├── executor/           # Docker sandboxing daemon & runner images
├── docker/
│   ├── runner-python/  # Python 3.11 execution container
│   ├── runner-cpp/     # GCC 12 & Clang toolchain
│   └── runner-node/    # Node 20 & TypeScript runner
├── k8s/                # Kubernetes Deployment, Ingress & HPA YAMLs
└── README.md           # Quickstart guide & environment setup

KEY REFERENCES:
1. Nicolaescu, P., et al. (2015). "Near-Real-Time Peer-to-Peer Shared Editing on Extensible Data Types". IEEE ICWE.
2. Sun, C., & Ellis, C. (1998). "Operational transformation in real-time group editors". ACM CSCW.

COMMONLY ASKED VIVA QUESTIONS:
Q1: How do you prevent a malicious student from escaping the Docker container?
A1: We implement defense-in-depth: complete network isolation (--network none), read-only root filesystems, dropping all Linux kernel capabilities (CAP_DROP ALL), PID limits (50), and execution under an unprivileged user (UID 1000).

Q2: Why use Yjs instead of raw WebSockets sending full text files?
A2: Sending full files consumes massive bandwidth and completely overwrites concurrent edits. Yjs transmits only the microscopic cryptographic diffs (typically < 20 bytes per keystroke), converging mathematically without race conditions.`
      }
    ]
  },

  // 5. Decentralized Zero-Knowledge Cross-Chain Escrow
  {
    id: 'book-proj-zk-escrow',
    title: 'Decentralized Zero-Knowledge Cross-Chain Escrow & Identity Protocol',
    author: 'Student Engineering Lead: Arjun Mehta (Applied Cryptography & Web3)',
    category: 'projects',
    badge: 'Top Student Project • Web3 & Cryptography',
    description: 'A trustless cross-chain decentralized escrow protocol powered by ZK-SNARKs (Circom), Solidity smart contracts, and cryptographic proof of solvency.',
    coverEmoji: '🔐',
    coverColor: 'from-amber-600 via-yellow-700 to-slate-900',
    totalPages: 10,
    readPages: [],
    projectMetadata: {
      difficulty: 'Capstone',
      domain: 'Cryptography, Distributed Ledgers & Smart Contracts',
      techStack: ['Solidity 0.8.24', 'Circom 2.1', 'SnarkJS', 'Hardhat', 'Ethers.js', 'Next.js', 'OpenZeppelin'],
      timelineWeeks: 12,
      githubRepo: 'https://github.com/eth-student-research/zk-cross-chain-escrow',
      keyDeliverables: [
        'Circom ZK-SNARK circuit proving identity & collateral solvency privately',
        'Solidity escrow contract supporting multi-sig arbitration & timelocks',
        'On-chain Groth16 cryptographic proof verifier smart contract',
        'Cross-chain message relay relayer using EIP-712 typed data signatures',
        'Complete security audit test suite with Slither and Echidna fuzzing'
      ],
      hardwareRequired: [
        'Standard workstation for generating zero-knowledge proving keys and running local testnet nodes'
      ]
    },
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Trust Problem, Decentralized Escrow & ZK Privacy Proofs',
        content: `PROJECT TITLE: Privacy-Preserving Cross-Chain Escrow Protocol Using Zero-Knowledge Proofs (ZK-SNARKs)
ACADEMIC DOMAIN: Cryptography, Blockchain, Smart Contracts, Security Engineering
PROJECT TYPE: Senior Capstone / Cryptographic Systems Thesis

THE PROBLEM:
Conducting high-value peer-to-peer commerce or cross-chain asset swaps between anonymous parties requires an escrow intermediary. Traditional centralized escrows (PayPal, banks) charge high fees (3-5%), impose geographic sanctions, and leak sensitive transaction histories. Furthermore, public blockchains expose wallet balances and transaction counterparties to the open internet.

THE SOLUTION:
This project designs and implements a trustless decentralized escrow protocol that utilizes Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (ZK-SNARKs). Buyers prove that they possess sufficient collateral and meet KYC/AML credential criteria without revealing their wallet address, net worth, or transaction amount on-chain!`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Protocol Architecture, Smart Contracts & Relay Validators',
        content: `PROTOCOL ARCHITECTURE & ACTOR ROLES:

Protocol Participants:
1. Buyer (Depositor): Locks crypto-assets into an Escrow Vault. Generates a client-side ZK-SNARK proof that they hold the secret preimage (commitment).
2. Seller (Beneficiary): Fulfills off-chain contractual goods/services.
3. Decoupled Arbitrator (DAO / Multi-Sig): Steps in only if a dispute arises.
4. Relayer: Submits zero-knowledge proofs on-chain to pay gas on behalf of users (meta-transactions).

CRYPTOGRAPHIC PRIMITIVES:
- Poseidon Hash: Arithmetic-friendly hash function optimized for zero-knowledge R1CS circuits (10x cheaper in ZK constraints than SHA-256).
- Groth16 Proof System: Constant-size zero-knowledge proofs (128 bytes) verified on-chain on Ethereum for under 220,000 gas.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Technology Stack (Solidity, Circom, SnarkJS, Next.js, Wagmi, Hardhat)',
        content: `TECHNOLOGY STACK & CRYPTOGRAPHIC TOOLCHAIN:

- Circuit Language: Circom 2.1 (Compiles arithmetic circuits into Rank-1 Constraint Systems - R1CS).
- Proving Engine: SnarkJS (Powers client-side WebAssembly proof generation and powers Trusted Setup Phase 2).
- Smart Contract Language: Solidity 0.8.24 (Deploys on Ethereum Sepolia and Polygon testnets).
- Smart Contract Framework: Hardhat & Foundry (Automated testing, gas profiling, and fuzzing).
- Contract Libraries: OpenZeppelin Contracts (ReentrancyGuard, SafeERC20, Ownable).
- Frontend DApp: Next.js 14, Wagmi, Viem, and RainbowKit for Web3 wallet connection.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: 12-Week Development Roadmap (From Circuit Design to Testnet Audit)',
        content: `12-WEEK DEVELOPMENT & AUDIT ROADMAP:

WEEK 1-2: CRYPTOGRAPHIC CIRCOM CIRCUIT FORMULATION
- Design arithmetic circuits in Circom: private inputs (secret, nullifier), public inputs (commitment, root).
- Compute R1CS constraint counts (achieved under 2,000 constraints).

WEEK 3-4: TRUSTED SETUP & VERIFIER CONTRACT GENERATION
- Execute Powers of Tau ceremony (bn128 curve).
- Export Solidity Verifier.sol contract via SnarkJS.

WEEK 5-6: SOLIDITY ESCROW SMART CONTRACT
- Implement EscrowVault.sol with states: CREATED, FUNDED, COMPLETED, DISPUTED, REFUNDED.
- Implement timelock refund mechanism (if seller does not deliver within 7 days, buyer can auto-reclaim funds).

WEEK 7-8: FRONTEND CLIENT-SIDE PROVER
- Embed snarkjs.min.js and Poseidon hash inside Next.js web application.
- Benchmark proof generation time in browser (achieved < 1.8 seconds on M2 MacBook).

WEEK 9-10: SECURITY AUDIT & STATIC ANALYSIS
- Run Slither static analyzer; eliminate reentrancy and integer truncation warnings.
- Run Echidna property-based fuzzing for 1,000,000 test transactions.

WEEK 11-12: TESTNET DEPLOYMENT & CAPSTONE VIVA
- Deploy to Ethereum Sepolia and Polygon testnets.
- Complete formal verification report and public GitHub repository.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: ZK-SNARK Circuit Implementation (Circom Proof of Solvency & Identity)',
        content: `CIRCOM ARITHMETIC CIRCUIT (circuits/escrow_commitment.circom):

\`\`\`circom
pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/poseidon.circom";

template EscrowCommitmentVerifier() {
    // Private Inputs (Known only to user)
    signal input secretPreimage;
    signal input nullifierSecret;
    signal input accountBalance;
    
    // Public Inputs (Exposed on-chain)
    signal input requiredCollateral;
    signal input commitmentHash;
    signal input nullifierHash;

    // 1. Verify Commitment Hash: commitment = Poseidon(secretPreimage, nullifierSecret)
    component commitmentHasher = Poseidon(2);
    commitmentHasher.inputs[0] <== secretPreimage;
    commitmentHasher.inputs[1] <== nullifierSecret;
    commitmentHasher.out === commitmentHash;

    // 2. Verify Nullifier Hash: nullifier = Poseidon(nullifierSecret)
    component nullifierHasher = Poseidon(1);
    nullifierHasher.inputs[0] <== nullifierSecret;
    nullifierHasher.out === nullifierHash;

    // 3. Verify Solvency without revealing balance: accountBalance >= requiredCollateral
    signal balanceDiff;
    balanceDiff <-- accountBalance - requiredCollateral;
    // Constraint ensuring balanceDiff is non-negative
    component comp = GreaterEqThan(64);
    comp.in[0] <== accountBalance;
    comp.in[1] <== requiredCollateral;
    comp.out === 1;
}

component main {public [requiredCollateral, commitmentHash, nullifierHash]} = EscrowCommitmentVerifier();
\`\`\``
      },
      {
        pageNumber: 6,
        title: 'Page 6: Solidity Escrow Contract with Multi-Sig Arbitration & Timelocks',
        content: `SOLIDITY ESCROW SMART CONTRACT (contracts/ZKEscrow.sol):

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IGroth16Verifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[3] memory input
    ) external view returns (bool);
}

contract ZKEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IGroth16Verifier public immutable verifier;
    mapping(bytes32 => bool) public spentNullifiers;
    
    enum EscrowStatus { AwaitingFulfillment, Completed, Refunded }

    struct EscrowTrade {
        bytes32 commitmentHash;
        address seller;
        uint256 amount;
        uint256 expiryTimestamp;
        EscrowStatus status;
    }

    mapping(bytes32 => EscrowTrade) public trades;

    event TradeFunded(bytes32 indexed tradeId, bytes32 commitmentHash, uint256 amount);
    event TradeSettled(bytes32 indexed tradeId, bytes32 nullifier);

    constructor(address _verifierAddress) {
        verifier = IGroth16Verifier(_verifierAddress);
    }

    function createEscrow(bytes32 tradeId, bytes32 commitmentHash, address seller, uint256 timelockDays) external payable nonReentrant {
        require(trades[tradeId].amount == 0, "Trade already exists");
        require(msg.value > 0, "Zero deposit not allowed");

        trades[tradeId] = EscrowTrade({
            commitmentHash: commitmentHash,
            seller: seller,
            amount: msg.value,
            expiryTimestamp: block.timestamp + (timelockDays * 1 days),
            status: EscrowStatus.AwaitingFulfillment
        });

        emit TradeFunded(tradeId, commitmentHash, msg.value);
    }

    function completeTradeWithZKProof(
        bytes32 tradeId,
        bytes32 nullifierHash,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c
    ) external nonReentrant {
        EscrowTrade storage trade = trades[tradeId];
        require(trade.status == EscrowStatus.AwaitingFulfillment, "Trade not active");
        require(!spentNullifiers[nullifierHash], "Nullifier already spent (double-spend protection)");

        uint256[3] memory publicSignals = [trade.amount, uint256(trade.commitmentHash), uint256(nullifierHash)];
        require(verifier.verifyProof(a, b, c, publicSignals), "Invalid Zero-Knowledge Proof");

        spentNullifiers[nullifierHash] = true;
        trade.status = EscrowStatus.Completed;

        (bool success, ) = trade.seller.call{value: trade.amount}("");
        require(success, "ETH transfer failed");

        emit TradeSettled(tradeId, nullifierHash);
    }
}
\`\`\``
      },
      {
        pageNumber: 7,
        title: 'Page 7: Cross-Chain Messaging Bridge & Cryptographic Signature Verification',
        content: `CROSS-CHAIN MESSAGING & EIP-712 SECP256K1 SIGNATURES:

How Cross-Chain Settlement Operates:
1. Lock on Ethereum: Buyer deposits 5.0 ETH into ZKEscrow on Ethereum Sepolia.
2. Relayer Observes Event: An off-chain Golang relayer listens to TradeFunded logs.
3. Cross-Chain Verification: Relayer submits an EIP-712 structured payload signed by a threshold federation of validators to the destination chain (Polygon zkEVM).
4. Release on Destination: The destination contract releases matching stablecoin liquidity to the seller.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Frontend DApp Integration with Web3Modal & Gas Optimization (EIP-712)',
        content: `FRONTEND DAPP ARCHITECTURE & GAS OPTIMIZATION:

EIP-712 Gas Optimization:
Instead of requiring buyers to execute an on-chain transaction to approve escrow parameters, users sign an off-chain cryptographic signature (Permit / EIP-712). The relayer submits the signature and proof in a single atomic transaction, saving the buyer Ethereum gas fees.

Browser Proving Performance:
Using WebAssembly (wasm) and Web Workers, SnarkJS computes multi-scalar multiplications (MSM) on a background thread without freezing the React UI.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Security Audit Checklist, Slither Static Analysis & Reentrancy Guards',
        content: `SECURITY AUDIT & VULNERABILITY MITIGATION MATRIX:

1. Reentrancy Vulnerabilities:
- Risk: Malicious contracts re-invoking completeTrade before state variables update.
- Defense: OpenZeppelin ReentrancyGuard + Checks-Effects-Interactions pattern (updating spentNullifiers[nullifier] = true BEFORE calling external transfers).

2. Front-Running & MEV (Maximal Extractable Value):
- Risk: A rogue miner observes a valid ZK proof in the public mempool and submits it with their own address.
- Defense: The buyer's designated seller address is embedded directly as a public input in the ZK proof; if a third party attempts to redirect funds, the proof verification fails mathematically.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Complete Research References, GitHub Repository Template & Viva Questions',
        content: `GITHUB BLUEPRINT, REFERENCES & DEFENSE VIVA FAQS:

REPOSITORY BLUEPRINT:
zk-cross-chain-escrow/
├── circuits/           # Circom zero-knowledge circuit source code
├── contracts/          # Solidity smart contracts (ZKEscrow, Verifier)
├── scripts/            # Deployment & Phase 2 trusted setup scripts
├── test/               # Hardhat test suite & Slither static analysis
├── frontend/           # Next.js 14 Web3 application
└── audit/              # Echidna fuzz testing report & gas analysis

KEY ACADEMIC CITATIONS:
1. Groth, J. (2016). "On the Size of Pairing-based Non-interactive Arguments". EUROCRYPT 2016.
2. Grassi, L., et al. (2021). "Poseidon: A New Hash Function for Zero-Knowledge Proof Systems". USENIX Security 2021.

TOP VIVA / INTERVIEW QUESTIONS:
Q1: What is the purpose of the 'Nullifier' in zero-knowledge systems?
A1: Because zero-knowledge proofs reveal no information about the underlying secret, an attacker could resubmit the exact same proof to withdraw money multiple times. A nullifier is a unique cryptographic hash derived deterministically from the secret. Storing spent nullifiers on-chain prevents double-spending while preserving anonymity.`
      }
    ]
  },

  // 6. IoT Smart Microgrid Energy Management System
  {
    id: 'book-proj-iot-microgrid',
    title: 'Smart IoT Microgrid Energy Management System with Predictive Load Balancing',
    author: 'Student Engineering Lead: Priya S. Ramanathan (Electrical & Computer Engineering)',
    category: 'projects',
    badge: 'Top Student Project • IoT & CleanTech',
    description: 'An industrial IoT cyber-physical microgrid managing solar photovoltaic generation, battery storage (BESS), smart relay actuators, and machine learning load forecasting.',
    coverEmoji: '⚡',
    coverColor: 'from-amber-700 via-orange-800 to-slate-900',
    totalPages: 10,
    readPages: [],
    projectMetadata: {
      difficulty: 'Capstone',
      domain: 'Internet of Things, Embedded Systems & Clean Energy',
      techStack: ['ESP32 (C++/FreeRTOS)', 'MQTT (Mosquitto)', 'TimescaleDB', 'Python', 'LSTM (TensorFlow)', 'Grafana', 'React'],
      timelineWeeks: 12,
      githubRepo: 'https://github.com/gatech-energy/smart-iot-microgrid',
      keyDeliverables: [
        'ESP32 embedded firmware with FreeRTOS reading voltage/current sensors at 1 kHz',
        'MQTT over TLS telemetric communication pipeline',
        'TimescaleDB time-series database storing sensor readings',
        'LSTM recurrent neural network predicting solar generation 24 hours ahead',
        'Automated peak-shaving relay load-shedding controller'
      ],
      hardwareRequired: [
        'ESP32-WROOM-32 Microcontroller Node',
        'INA219 I2C High-Side DC Current/Power Sensor',
        'ZMPT101B Active AC Voltage Sensor',
        'ACS712 30A Hall Effect Current Sensor Module',
        '4-Channel 10A Solid State Relay (SSR) Module',
        '100W Monocrystalline Solar PV Panel & 12V 20Ah LiFePO4 Battery'
      ]
    },
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Microgrid Challenges, Renewable Fluctuation & Demand Response',
        content: `PROJECT TITLE: Cyber-Physical IoT Microgrid Energy Management System with Machine Learning Peak-Shaving and Automated Load Shedding
ACADEMIC DOMAIN: Internet of Things, Embedded Systems, Renewable Energy Engineering
PROJECT TYPE: Senior Capstone / CleanTech Engineering Thesis

EXECUTIVE SUMMARY:
Integrating intermittent renewable energy (solar, wind) into electrical grids poses severe stability challenges. Sudden cloud cover drops solar PV output by 80% within seconds. Without intelligent edge monitoring and rapid load balancing, microgrids face voltage sags, brownouts, and battery degradation.

PROJECT OBJECTIVES:
1. High-Rate Embedded Sensing: Deploy ESP32 microcontroller nodes to sample AC/DC power, bus voltage, and battery State-of-Charge (SoC) at 1 kHz.
2. Secure Telemetry Pipeline: Stream telemetry over MQTT with TLS 1.3 encryption to a central gateway.
3. Predictive AI Forecasting: Train an LSTM neural network on solar irradiance and weather forecasts to predict power production 24 hours in advance.
4. Autonomous Demand Response: Dynamically switch non-critical loads (HVAC, EV chargers) via solid-state relays to eliminate expensive peak-hour grid tariffs.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Hardware Architecture, ESP32 Sensor Nodes & Grid Actuators',
        content: `HARDWARE ARCHITECTURE & ELECTRICAL SYSTEM SCHEMATIC:

1. Electrical Power Architecture:
- Power Sources: 100W Solar PV Array + 12V 20Ah LiFePO4 Battery Storage System (BESS) + 230V AC Utility Grid Connection.
- Charge Controller: MPPT (Maximum Power Point Tracking) solar charge controller ensuring optimal PV power extraction.
- Inverter: 500W Pure Sine Wave DC-AC Inverter.

2. Embedded Sensing & Actuation Node (ESP32):
- Microcontroller: ESP32 dual-core Xtensa LX6 @ 240 MHz with built-in Wi-Fi and Bluetooth.
- DC Current & Voltage Sensing: INA219 sensor communicates over I2C (12-bit ADC).
- AC Mains Sensing: ZMPT101B voltage transformer + ACS712 Hall-effect current sensor.
- Actuator: 4-channel optically isolated Solid-State Relay (SSR) module controlling 230V appliances.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Software & Telemetry Stack (MQTT Broker, TimescaleDB, Python, Grafana)',
        content: `SOFTWARE ARCHITECTURE & TELEMETRY PROTOCOL:

1. Embedded Firmware:
- Developed in C++ using ESP-IDF / FreeRTOS.
- Core 0 Dedicated Task: High-speed ADC sampling and digital RMS filtering.
- Core 1 Dedicated Task: Wi-Fi network stack, MQTT client, and OTA (Over-The-Air) firmware updates.

2. Telemetry Ingest & Storage:
- Eclipse Mosquitto: Secure MQTT broker listening on port 8883 (MQTTS).
- TimescaleDB (PostgreSQL extension): Hypertables partitioned on time chunks optimized for billions of timestamped sensor readings.

3. Analytics & Visualization:
- Python FastAPI: Microgrid supervisory control service.
- Grafana: Industrial dashboard rendering real-time power flow animations, battery state, and grid carbon intensity metrics.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: 12-Week Development Roadmap (From Breadboard to Field Deployment)',
        content: `12-WEEK IMPLEMENTATION ROADMAP:

WEEK 1-2: HARDWARE PROTOTYPING & SENSOR CALIBRATION
- Assemble benchtop power circuit with 12V LiFePO4 battery and resistive DC loads.
- Calibrate INA219 and ZMPT101B sensors against a Fluke precision multimeter.

WEEK 3-4: FREERTOS FIRMWARE DEVELOPMENT
- Implement multi-threaded FreeRTOS tasks with mutexes protecting shared sensor buffers.
- Integrate mbedTLS library for hardware-accelerated TLS handshakes on ESP32.

WEEK 5-6: TELEMETRY BROKER & TIMESCALEDB DATABASE
- Deploy Mosquitto MQTT broker on Raspberry Pi / Cloud VPS.
- Set up TimescaleDB hypertable schema with automated data retention policies.

WEEK 7-8: MACHINE LEARNING SOLAR FORECASTING MODEL
- Collect historical solar irradiance data from NOAA weather satellite APIs.
- Train LSTM model in TensorFlow to predict next-day PV wattage.

WEEK 9-10: PEAK-SHAVING & AUTONOMOUS RELAY CONTROLLER
- Implement finite-state-machine (FSM) control algorithm for automated load-shedding.
- Conduct live switching tests under simulated grid failure conditions.

WEEK 11-12: TESTING, POWER QUALITY ANALYSIS & DEFENSE
- Continuous 14-day field deployment test powering laboratory loads.
- Final capstone engineering report and live hardware demonstration.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Firmware Implementation (FreeRTOS, MQTT over TLS, Sensor Polling)',
        content: `ESP32 FREERTOS EMBEDDED C++ FIRMWARE (src/main.cpp):

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <Adafruit_INA219.h>

Adafruit_INA219 ina219;
WiFiClientSecure espClient;
PubSubClient mqttClient(espClient);

const char* ssid = "MICROGRID_LAB_WIFI";
const char* password = "LabSecurePassword123";
const char* mqtt_server = "telemetry.microgrid-hub.local";

void sensorSamplingTask(void *pvParameters) {
  for (;;) {
    float busVoltage = ina219.getBusVoltage_V();
    float current_mA = ina219.getCurrent_mA();
    float power_mW = ina219.getPower_mW();

    char payload[128];
    snprintf(payload, sizeof(payload), 
      "{\"v\":%.2f,\"i\":%.2f,\"p\":%.2f,\"ts\":%lu}", 
      busVoltage, current_mA, power_mW, millis());

    if (mqttClient.connected()) {
      mqttClient.publish("microgrid/sensors/dc_bus", payload);
    }

    vTaskDelay(pdMS_TO_TICKS(100)); // Sample at 10 Hz
  }
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // I2C Pins SDA, SCL
  ina219.begin();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }

  espClient.setCACert(ROOT_CA_CERTIFICATE); // Enforce TLS security
  mqttClient.setServer(mqtt_server, 8883);

  // Pin sensor task to Core 0
  xTaskCreatePinnedToCore(
    sensorSamplingTask, "SensorTask", 4096, NULL, 1, NULL, 0);
}
\`\`\``
      },
      {
        pageNumber: 6,
        title: 'Page 6: Machine Learning Forecasting Model (LSTM Time-Series for Solar Output)',
        content: `LSTM TIME-SERIES PREDICTIVE FORECASTING MODEL:

Input Features:
- Solar Irradiance (GHI - Global Horizontal Irradiance, W/m^2).
- Ambient Temperature, Cloud Cover percentage, Humidity.
- Cyclical Time Features: sin(2 * pi * hour / 24), cos(2 * pi * hour / 24).

Model Architecture:
- Input Shape: (Batch_Size, 24 timesteps, 7 features).
- Layer 1: LSTM(64 units, return_sequences=True) + Dropout(0.2).
- Layer 2: LSTM(32 units, return_sequences=False).
- Dense Layer: Dense(24) -> Predicts expected kW generation for each of the next 24 hours.

Performance Metric:
Achieved a Mean Absolute Percentage Error (MAPE) of 6.8% on unseen seasonal test data.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Automated Relay Switching & Peak-Shaving Load Distribution Logic',
        content: `PEAK-SHAVING AUTOMATED LOAD SHEDDING ALGORITHM:

The Microgrid Central Controller executes the following decision logic every 60 seconds:
1. Read Battery State of Charge (SoC):
   - If SoC > 80% and Solar PV > Load Demand:
     - Activate priority charging for Electric Vehicle (EV).
     - Export surplus power to utility grid if net-metering tariff is profitable.
2. If Grid Tariff is in PEAK PERIOD (4 PM - 9 PM):
   - Shed Non-Critical Load #1 (Water heater).
   - Supply Critical Load #1 (Refrigeration, Lab Equipment) exclusively from LiFePO4 battery storage, avoiding expensive peak grid energy ($0.45/kWh vs $0.12/kWh off-peak).
3. If SoC < 20% (Deep Discharge Protection):
   - Automatically reconnect to grid to safeguard battery chemical lifespan.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Real-Time Telemetry Dashboard, Alerts & WebSockets Streaming',
        content: `SUPERVISORY DASHBOARD & NOTIFICATION SYSTEM:

Dashboard Features:
1. Animated Sankey Diagram: Shows live energy flows between Solar Panels -> Battery Storage -> AC Loads -> Grid.
2. WebSockets Alert Feed: Sends instant push notifications to facility engineers if temperature sensors detect inverter overheating (> 70 C) or battery overvoltage.
3. Monthly Financial Savings Calculator: Displays accumulated money saved through automated peak-shaving.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Power Quality Analysis, Surge Protection & Hardware Safety Protocols',
        content: `ELECTRICAL SAFETY PROTOCOLS & SURGE PROTECTION:

1. Galvanic Isolation:
High-voltage 230V AC mains lines are optically isolated from 3.3V ESP32 logic lines using PC817 optocouplers, protecting low-voltage silicon from 1000V transient voltage spikes.

2. Overcurrent & Short-Circuit Protection:
- Fast-acting ceramic fuses on each sensor branch.
- Metal Oxide Varistors (MOVs) across AC live and neutral lines clamp lightning surges.
- Snubber Circuits (0.1uF capacitor + 100 Ohm resistor) across relay contacts absorb inductive inductive kickback spikes when switching inductive motor loads.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Complete Schematics, GitHub Repository Blueprint, Citations & Viva FAQs',
        content: `GITHUB BLUEPRINT, CITATIONS & DEFENSE VIVA FAQS:

REPOSITORY BLUEPRINT:
smart-iot-microgrid/
├── hardware/           # KiCad schematics, PCB layout Gerber files, BOM
├── firmware/           # ESP-IDF C++ FreeRTOS firmware
├── server/             # Mosquitto MQTT config & TimescaleDB setup
├── ml/                 # LSTM solar forecasting model & training scripts
├── dashboard/          # Grafana dashboards & React control panel
└── docs/               # Electrical safety audit & installation manual

KEY ACADEMIC REFERENCES:
1. Lasseter, R. H. (2002). "Microgrids". IEEE Power Engineering Society Winter Meeting, 1, 305-308.
2. Hatziargyriou, N., et al. (2007). "Microgrids". IEEE Power and Energy Magazine, 5(4), 78-94.

TOP VIVA / DEFENSE QUESTIONS:
Q1: Why choose FreeRTOS on the ESP32 instead of simple Arduino loop()?
A1: An Arduino loop() runs single-threaded; high-frequency ADC sampling would freeze Wi-Fi networking, causing dropped MQTT packets. FreeRTOS allows pinning the 1 kHz sensor sampling task to Core 0 and networking/MQTT to Core 1, ensuring zero jitter and reliable data transmission.

Q2: What is the benefit of TimescaleDB over standard PostgreSQL?
A2: Standard PostgreSQL performance degrades significantly once tables reach millions of rows due to B-Tree index bloat. TimescaleDB partitions data into time-based 'chunks' (hypertables), keeping active write indexes resident in RAM, enabling 10x higher ingestion rates for sensor streams.`
      }
    ]
  }
];
