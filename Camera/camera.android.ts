﻿import app_module = require("Application/application");

export module tk {
    export module io {
        var REQUEST_IMAGE_CAPTURE: number = 1;
        var REQUEST_SELECT_PICTURE: number = 2;

        export class CameraManager {
            public takePicture(params: any, onSuccess: (imageData: any) => any, onError?: (error: any) => any) {
                var takePictureIntent = new android.content.Intent('android.media.action.IMAGE_CAPTURE');
                var androidApp = app_module.tk.ui.Application.current.android;

                if (takePictureIntent.resolveActivity(androidApp.context.getPackageManager()) !== null) {
                    androidApp.currentActivity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
                }
            }

            // options { useSavedPhotos: true }
            public pictureFromLibrary(params: any, onSuccess: (imageData: any) => any, onError?: (error: any) => any) {
                var readPictureIntent = new android.content.Intent();
                var androidApp = app_module.tk.ui.Application.current.android;

                readPictureIntent.setType('image/*');
                readPictureIntent.setAction('android.intent.action.GET_CONTENT');

                androidApp.currentActivity.startActivityForResult(android.content.Intent.createChooser(readPictureIntent, 'Select Picture'),
                    REQUEST_SELECT_PICTURE);
            }
        }
    }
} 