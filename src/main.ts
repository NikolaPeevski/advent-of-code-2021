import { sonarScan, sonarWindowScan } from './day1/sonarScan';
import { depthAimCalc, depthCalc } from './day2/depthCalc';
import {
  genLifeSupportRating,
  genPowerConsumtion
} from './day3/diagnosticsCalc';

// Day 1
sonarScan();
sonarWindowScan();

// Day 2
depthCalc();
depthAimCalc();

// Day 3
genPowerConsumtion();
genLifeSupportRating();
