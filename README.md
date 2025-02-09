# Prioritization-of-VoIP-Packets
Prioritizing VoIP Packets in order to reduce latency and jitter using eBPF.
We are using a customised VoIP applictaion created using webRTC which allow VoIP packet transfer between two devices. Then we ought to increase the priority of these packets using eBPF to create hook points in the networking stack of linux kernel. We expect to reduce latency and jitter of these packets. 
Project under Progress

