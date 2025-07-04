# Quick Start Guide - License Plate Detection

## Fastest Way to Get Started

1. **Navigate to the directory:**
   ```bash
   cd /Users/user/Homepage/homepage2
   ```

2. **Run the simple setup:**
   ```bash
   python3 run_license_plate_detection.py
   ```

That's it! This will automatically:
- Install required packages
- Download the YOLO model
- Process all images in your camper directory
- Save blurred images to the output directory

## Alternative: Interactive Setup

If you want more control, use the interactive script:

```bash
chmod +x execute_license_plate_blur.sh
./execute_license_plate_blur.sh
```

## Files Created for You

- `license_plate_blur.py` - Main detection script
- `license_plate_detector_enhanced.py` - Enhanced version with multiple methods
- `run_license_plate_detection.py` - Simple one-click runner
- `test_license_plate_detection.py` - Test with single image
- `validate_setup.py` - Check if everything is working
- `requirements.txt` - Package dependencies
- `setup_lp_env.sh` - Virtual environment setup
- `execute_license_plate_blur.sh` - Interactive runner

## What It Does

1. **Detects license plates** in images using YOLOv8
2. **Applies blur effects** (mosaic or gaussian) to protect privacy
3. **Processes all images** in `/Users/user/Homepage/homepage1/support/camper/`
4. **Saves processed images** to `/Users/user/Homepage/homepage2/assets/images/camper/`

## Supported Formats

- JPG, JPEG, PNG, BMP, TIFF, WebP

## Need Help?

- Check `LICENSE_PLATE_DETECTION_README.md` for detailed instructions
- Check `LICENSE_PLATE_SETUP_SUMMARY.md` for complete overview
- Run `python3 validate_setup.py` to diagnose issues