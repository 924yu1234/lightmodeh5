import React, { useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import styled from 'styled-components';

interface QrReaderProps {
  onResult: (text: string) => void;
  onError?: (error: any) => void;
}

const QrReader: React.FC<QrReaderProps> = ({ onResult, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const startScanning = async () => {
      try {
        const videoInputDevices = await codeReader.getVideoInputDevices();
        // 优先使用后置摄像头
        const selectedDevice =
          videoInputDevices.find(
            (device: any) =>
              device.label.toLowerCase().includes('back') ||
              device.label.toLowerCase().includes('后置')
          ) || videoInputDevices[0];

        await codeReader.decodeFromInputVideoDeviceContinuously(
          selectedDevice.deviceId,
          'qr-video',
          (result: any, err: any) => {
            if (result) {
              const text = result.getText();
              if (text) {
                onResult(text);
              }
            }
            if (err && onError) {
              // 只在非 NotFoundException 时报错
              onError(err);
              // if (!(err instanceof ZXing.NotFoundException)) {
              // }
            }
          }
        );
      } catch (error) {
        onError?.(error);
      }
    };

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, [onResult, onError]);

  return (
    <QrReaderContainer>
      <video ref={videoRef} id="qr-video">
        <track kind="captions" />
      </video>
    </QrReaderContainer>
  );
};

const QrReaderContainer = styled.div`
  position: relative;
  width: 270px;
  height: 270px;
  overflow: hidden;
  border-radius: 5px;

  video {
    width: 270px;
    height: 270px;
    object-fit: cover;
  }
`;

// const ScannerOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   border: 2px solid ${(props) => props.theme.border_white_50};
//   border-radius: 12px;
//   box-shadow: inset 0 0 0 2px rgba(76, 175, 80, 0.3);

//   &::before {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 0;
//     right: 0;
//     height: 2px;
//     background: ${(props) => props.theme.bg_4caf50_50};
//     animation: scan 2s linear infinite;
//   }

//   @keyframes scan {
//     0% {
//       transform: translateY(-100px);
//     }
//     100% {
//       transform: translateY(100px);
//     }
//   }
// `;

export default QrReader;
