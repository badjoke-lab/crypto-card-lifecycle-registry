# Phase 4 UI slice 4 — role-directed graph

This slice replaces the equal-radius orbital layout with a role-directed relationship field derived only from canonical relation/provider metadata.

Rules:
- programs occupy the program lane;
- issuer/program-manager/general provider roles occupy the infrastructure lane;
- processors occupy the processing lane;
- card networks occupy the network lane;
- multi-role providers keep one node and are placed by the strongest canonical role available in the current neighborhood;
- no missing role is inferred or synthesized;
- incident markers are anchored only to the canonical entity that owns the event;
- mobile renders one-hop relations as explicit path controls below the graph rather than requiring precision taps on SVG edges.
