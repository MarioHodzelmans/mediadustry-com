"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Register before any legacy component creates a tween, including lazy navigation.
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", ".87, 0, .13, 1");
CustomEase.create("common", ".23, .65, .74, 1.09");
CustomEase.create("custom", ".23, .65, .74, 1.09");
