/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/common";
/**
 * @record
 */
export function UploadResponse() { }
if (false) {
    /** @type {?} */
    UploadResponse.prototype.imageUrl;
}
var AngularEditorService = /** @class */ (function () {
    function AngularEditorService(http, doc) {
        var _this = this;
        this.http = http;
        this.doc = doc;
        /**
         * save selection when the editor is focussed out
         */
        this.saveSelection = (/**
         * @return {?}
         */
        function () {
            if (_this.doc.getSelection) {
                /** @type {?} */
                var sel = _this.doc.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    _this.savedSelection = sel.getRangeAt(0);
                    _this.selectedText = sel.toString();
                }
            }
            else if (_this.doc.getSelection && _this.doc.createRange) {
                _this.savedSelection = document.createRange();
            }
            else {
                _this.savedSelection = null;
            }
        });
    }
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param command string from triggerCommand
     */
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    AngularEditorService.prototype.executeCommand = /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    function (command) {
        /** @type {?} */
        var commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
        if (commands.includes(command)) {
            this.doc.execCommand('formatBlock', false, command);
            return;
        }
        this.doc.execCommand(command, false, null);
    };
    /**
     * Create URL link
     * @param url string from UI prompt
     */
    /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    AngularEditorService.prototype.createLink = /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    function (url) {
        if (!url.includes('http')) {
            this.doc.execCommand('createlink', false, url);
        }
        else {
            /** @type {?} */
            var newUrl = '<a href="' + url + '" target="_blank">' + this.selectedText + '</a>';
            this.insertHtml(newUrl);
        }
    };
    /**
     * insert color either font or background
     *
     * @param color color to be inserted
     * @param where where the color has to be inserted either text/background
     */
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    AngularEditorService.prototype.insertColor = /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    function (color, where) {
        /** @type {?} */
        var restored = this.restoreSelection();
        if (restored) {
            if (where === 'textColor') {
                this.doc.execCommand('foreColor', false, color);
            }
            else {
                this.doc.execCommand('hiliteColor', false, color);
            }
        }
    };
    /**
     * Set font name
     * @param fontName string
     */
    /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    AngularEditorService.prototype.setFontName = /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    function (fontName) {
        this.doc.execCommand('fontName', false, fontName);
    };
    /**
     * Set font size
     * @param fontSize string
     */
    /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    AngularEditorService.prototype.setFontSize = /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    function (fontSize) {
        this.doc.execCommand('fontSize', false, fontSize);
    };
    /**
     * Create raw HTML
     * @param html HTML string
     */
    /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    AngularEditorService.prototype.insertHtml = /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    function (html) {
        /** @type {?} */
        var isHTMLInserted = this.doc.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    };
    /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     */
    /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     * @return {?}
     */
    AngularEditorService.prototype.restoreSelection = /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     * @return {?}
     */
    function () {
        if (this.savedSelection) {
            if (this.doc.getSelection) {
                /** @type {?} */
                var sel = this.doc.getSelection();
                sel.removeAllRanges();
                sel.addRange(this.savedSelection);
                return true;
            }
            else if (this.doc.getSelection /*&& this.savedSelection.select*/) {
                // this.savedSelection.select();
                return true;
            }
        }
        else {
            return false;
        }
    };
    /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     */
    /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     * @param {?} callbackFn
     * @param {?=} timeout
     * @return {?}
     */
    AngularEditorService.prototype.executeInNextQueueIteration = /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     * @param {?} callbackFn
     * @param {?=} timeout
     * @return {?}
     */
    function (callbackFn, timeout) {
        if (timeout === void 0) { timeout = 1e2; }
        setTimeout(callbackFn, timeout);
    };
    /** check any selection is made or not */
    /**
     * check any selection is made or not
     * @private
     * @return {?}
     */
    AngularEditorService.prototype.checkSelection = /**
     * check any selection is made or not
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedText = this.savedSelection.toString();
        if (selectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    };
    /**
     * Upload file to uploadUrl
     * @param file The file
     */
    /**
     * Upload file to uploadUrl
     * @param {?} file The file
     * @return {?}
     */
    AngularEditorService.prototype.uploadImage = /**
     * Upload file to uploadUrl
     * @param {?} file The file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var uploadData = new FormData();
        uploadData.append('file', file, file.name);
        return this.http.post(this.uploadUrl, uploadData, {
            reportProgress: true,
            observe: 'events',
        });
    };
    /**
     * Insert image with Url
     * @param imageUrl The imageUrl.
     */
    /**
     * Insert image with Url
     * @param {?} imageUrl The imageUrl.
     * @return {?}
     */
    AngularEditorService.prototype.insertImage = /**
     * Insert image with Url
     * @param {?} imageUrl The imageUrl.
     * @return {?}
     */
    function (imageUrl) {
        this.doc.execCommand('insertImage', false, imageUrl);
    };
    /**
     * @param {?} separator
     * @return {?}
     */
    AngularEditorService.prototype.setDefaultParagraphSeparator = /**
     * @param {?} separator
     * @return {?}
     */
    function (separator) {
        this.doc.execCommand('defaultParagraphSeparator', false, separator);
    };
    /**
     * @param {?} customClass
     * @return {?}
     */
    AngularEditorService.prototype.createCustomClass = /**
     * @param {?} customClass
     * @return {?}
     */
    function (customClass) {
        /** @type {?} */
        var newTag = this.selectedText;
        if (customClass) {
            /** @type {?} */
            var tagName = customClass.tag ? customClass.tag : 'span';
            newTag = '<' + tagName + ' class="' + customClass.class + '">' + this.selectedText + '</' + tagName + '>';
        }
        this.insertHtml(newTag);
    };
    /**
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertVideo = /**
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        if (videoUrl.match('www.youtube.com')) {
            this.insertYouTubeVideoTag(videoUrl);
        }
        if (videoUrl.match('vimeo.com')) {
            this.insertVimeoVideoTag(videoUrl);
        }
    };
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertYouTubeVideoTag = /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        /** @type {?} */
        var id = videoUrl.split('v=')[1];
        /** @type {?} */
        var imageUrl = "https://img.youtube.com/vi/" + id + "/0.jpg";
        /** @type {?} */
        var thumbnail = "\n      <div style='position: relative'>\n        <img style='position: absolute; left:200px; top:140px'\n             src=\"https://img.icons8.com/color/96/000000/youtube-play.png\"/>\n        <a href='" + videoUrl + "' target='_blank'>\n          <img src=\"" + imageUrl + "\" alt=\"click to watch\"/>\n        </a>\n      </div>";
        this.insertHtml(thumbnail);
    };
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertVimeoVideoTag = /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        var _this = this;
        /** @type {?} */
        var sub = this.http.get("https://vimeo.com/api/oembed.json?url=" + videoUrl).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var imageUrl = data.thumbnail_url_with_play_button;
            /** @type {?} */
            var thumbnail = "<div>\n        <a href='" + videoUrl + "' target='_blank'>\n          <img src=\"" + imageUrl + "\" alt=\"" + data.title + "\"/>\n        </a>\n      </div>";
            _this.insertHtml(thumbnail);
            sub.unsubscribe();
        }));
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AngularEditorService.prototype.nextNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.hasChildNodes()) {
            return node.firstChild;
        }
        else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
    };
    /**
     * @param {?} range
     * @param {?} includePartiallySelectedContainers
     * @return {?}
     */
    AngularEditorService.prototype.getRangeSelectedNodes = /**
     * @param {?} range
     * @param {?} includePartiallySelectedContainers
     * @return {?}
     */
    function (range, includePartiallySelectedContainers) {
        /** @type {?} */
        var node = range.startContainer;
        /** @type {?} */
        var endNode = range.endContainer;
        /** @type {?} */
        var rangeNodes = [];
        // Special case for a range that is contained within a single node
        if (node === endNode) {
            rangeNodes = [node];
        }
        else {
            // Iterate nodes until we hit the end container
            while (node && node !== endNode) {
                rangeNodes.push(node = this.nextNode(node));
            }
            // Add partially selected nodes at the start of the range
            node = range.startContainer;
            while (node && node !== range.commonAncestorContainer) {
                rangeNodes.unshift(node);
                node = node.parentNode;
            }
        }
        // Add ancestors of the range container, if required
        if (includePartiallySelectedContainers) {
            node = range.commonAncestorContainer;
            while (node) {
                rangeNodes.push(node);
                node = node.parentNode;
            }
        }
        return rangeNodes;
    };
    /**
     * @return {?}
     */
    AngularEditorService.prototype.getSelectedNodes = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodes = [];
        if (this.doc.getSelection) {
            /** @type {?} */
            var sel = this.doc.getSelection();
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                nodes.push.apply(nodes, this.getRangeSelectedNodes(sel.getRangeAt(i), true));
            }
        }
        return nodes;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    AngularEditorService.prototype.replaceWithOwnChildren = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        /** @type {?} */
        var parent = el.parentNode;
        while (el.hasChildNodes()) {
            parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
    };
    /**
     * @param {?} tagNames
     * @return {?}
     */
    AngularEditorService.prototype.removeSelectedElements = /**
     * @param {?} tagNames
     * @return {?}
     */
    function (tagNames) {
        var _this = this;
        /** @type {?} */
        var tagNamesArray = tagNames.toLowerCase().split(',');
        this.getSelectedNodes().forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node.nodeType === 1 &&
                tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
                // Remove the node and replace it with its children
                _this.replaceWithOwnChildren(node);
            }
        }));
    };
    AngularEditorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AngularEditorService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ AngularEditorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AngularEditorService_Factory() { return new AngularEditorService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.DOCUMENT)); }, token: AngularEditorService, providedIn: "root" });
    return AngularEditorService;
}());
export { AngularEditorService };
if (false) {
    /** @type {?} */
    AngularEditorService.prototype.savedSelection;
    /** @type {?} */
    AngularEditorService.prototype.selectedText;
    /** @type {?} */
    AngularEditorService.prototype.uploadUrl;
    /**
     * save selection when the editor is focussed out
     * @type {?}
     */
    AngularEditorService.prototype.saveSelection;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3YvYW5ndWxhci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBWSxNQUFNLHNCQUFzQixDQUFDO0FBRTNELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQUd6QyxvQ0FFQzs7O0lBREMsa0NBQWlCOztBQUduQjtJQVNFLDhCQUNVLElBQWdCLEVBQ0UsR0FBUTtRQUZwQyxpQkFHSztRQUZLLFNBQUksR0FBSixJQUFJLENBQVk7UUFDRSxRQUFHLEdBQUgsR0FBRyxDQUFLOzs7O1FBOEU3QixrQkFBYTs7O1FBQUc7WUFDckIsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTs7b0JBQ25CLEdBQUcsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtnQkFDbkMsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7b0JBQ3BDLEtBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3BDO2FBQ0Y7aUJBQU0sSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDeEQsS0FBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDNUI7UUFDSCxD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QUNmLENBQUM7Ozs7O0lBRUQscURBQXNCOzs7O0lBQXRCLFVBQXVCLEVBQUU7O1lBQ2pCLE1BQU0sR0FBRyxFQUFFLENBQUMsVUFBVTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN6QixNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEM7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQscURBQXNCOzs7O0lBQXRCLFVBQXVCLFFBQVE7UUFBL0IsaUJBU0M7O1lBUk8sYUFBYSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLElBQUk7WUFDbkMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUM7Z0JBQ3JCLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUN4RCxtREFBbUQ7Z0JBQ25ELEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBblNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBWE8sVUFBVTtnREFvQmIsTUFBTSxTQUFDLFFBQVE7OzsrQkFyQnBCO0NBOFNDLEFBcFNELElBb1NDO1NBalNZLG9CQUFvQjs7O0lBRS9CLDhDQUE2Qjs7SUFDN0IsNENBQXFCOztJQUNyQix5Q0FBa0I7Ozs7O0lBa0ZsQiw2Q0FZQzs7Ozs7SUEzRkMsb0NBQXdCOzs7OztJQUN4QixtQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBFdmVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0N1c3RvbUNsYXNzfSBmcm9tICcuL2NvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkUmVzcG9uc2Uge1xuICBpbWFnZVVybDogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRWRpdG9yU2VydmljZSB7XG5cbiAgc2F2ZWRTZWxlY3Rpb246IFJhbmdlIHwgbnVsbDtcbiAgc2VsZWN0ZWRUZXh0OiBzdHJpbmc7XG4gIHVwbG9hZFVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55XG4gICkgeyB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVkIGNvbW1hbmQgZnJvbSBlZGl0b3IgaGVhZGVyIGJ1dHRvbnMgZXhjbHVkZSB0b2dnbGVFZGl0b3JNb2RlXG4gICAqIEBwYXJhbSBjb21tYW5kIHN0cmluZyBmcm9tIHRyaWdnZXJDb21tYW5kXG4gICAqL1xuICBleGVjdXRlQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb21tYW5kcyA9IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAncCcsICdwcmUnXTtcbiAgICBpZiAoY29tbWFuZHMuaW5jbHVkZXMoY29tbWFuZCkpIHtcbiAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCBjb21tYW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoY29tbWFuZCwgZmFsc2UsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBVUkwgbGlua1xuICAgKiBAcGFyYW0gdXJsIHN0cmluZyBmcm9tIFVJIHByb21wdFxuICAgKi9cbiAgY3JlYXRlTGluayh1cmw6IHN0cmluZykge1xuICAgIGlmICghdXJsLmluY2x1ZGVzKCdodHRwJykpIHtcbiAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgZmFsc2UsIHVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1VybCA9ICc8YSBocmVmPVwiJyArIHVybCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgdGhpcy5zZWxlY3RlZFRleHQgKyAnPC9hPic7XG4gICAgICB0aGlzLmluc2VydEh0bWwobmV3VXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0IGNvbG9yIGVpdGhlciBmb250IG9yIGJhY2tncm91bmRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yIGNvbG9yIHRvIGJlIGluc2VydGVkXG4gICAqIEBwYXJhbSB3aGVyZSB3aGVyZSB0aGUgY29sb3IgaGFzIHRvIGJlIGluc2VydGVkIGVpdGhlciB0ZXh0L2JhY2tncm91bmRcbiAgICovXG4gIGluc2VydENvbG9yKGNvbG9yOiBzdHJpbmcsIHdoZXJlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXN0b3JlZCA9IHRoaXMucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgaWYgKHdoZXJlID09PSAndGV4dENvbG9yJykge1xuICAgICAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnZm9yZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdoaWxpdGVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmb250IG5hbWVcbiAgICogQHBhcmFtIGZvbnROYW1lIHN0cmluZ1xuICAgKi9cbiAgc2V0Rm9udE5hbWUoZm9udE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdmb250TmFtZScsIGZhbHNlLCBmb250TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGZvbnQgc2l6ZVxuICAgKiBAcGFyYW0gZm9udFNpemUgc3RyaW5nXG4gICAqL1xuICBzZXRGb250U2l6ZShmb250U2l6ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoJ2ZvbnRTaXplJywgZmFsc2UsIGZvbnRTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgcmF3IEhUTUxcbiAgICogQHBhcmFtIGh0bWwgSFRNTCBzdHJpbmdcbiAgICovXG4gIGluc2VydEh0bWwoaHRtbDogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBjb25zdCBpc0hUTUxJbnNlcnRlZCA9IHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xuXG4gICAgaWYgKCFpc0hUTUxJbnNlcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGVyZm9ybSB0aGUgb3BlcmF0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNhdmUgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCBvdXRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2VsZWN0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLmRvYy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgaWYgKHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWwudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbiAmJiB0aGlzLmRvYy5jcmVhdGVSYW5nZSkge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXN0b3JlIHNlbGVjdGlvbiB3aGVuIHRoZSBlZGl0b3IgaXMgZm9jdXNlZCBpblxuICAgKlxuICAgKiBzYXZlZCBzZWxlY3Rpb24gd2hlbiB0aGUgZWRpdG9yIGlzIGZvY3VzZWQgb3V0XG4gICAqL1xuICByZXN0b3JlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb2MuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbiAvKiYmIHRoaXMuc2F2ZWRTZWxlY3Rpb24uc2VsZWN0Ki8pIHtcbiAgICAgICAgLy8gdGhpcy5zYXZlZFNlbGVjdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2V0VGltZW91dCB1c2VkIGZvciBleGVjdXRlICdzYXZlU2VsZWN0aW9uJyBtZXRob2QgaW4gbmV4dCBldmVudCBsb29wIGl0ZXJhdGlvblxuICAgKi9cbiAgcHVibGljIGV4ZWN1dGVJbk5leHRRdWV1ZUl0ZXJhdGlvbihjYWxsYmFja0ZuOiAoLi4uYXJnczogYW55W10pID0+IGFueSwgdGltZW91dCA9IDFlMik6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoY2FsbGJhY2tGbiwgdGltZW91dCk7XG4gIH1cblxuICAvKiogY2hlY2sgYW55IHNlbGVjdGlvbiBpcyBtYWRlIG9yIG5vdCAqL1xuICBwcml2YXRlIGNoZWNrU2VsZWN0aW9uKCk6IGFueSB7XG5cbiAgICBjb25zdCBzZWxlY3RlZFRleHQgPSB0aGlzLnNhdmVkU2VsZWN0aW9uLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoc2VsZWN0ZWRUZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBTZWxlY3Rpb24gTWFkZScpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgZmlsZSB0byB1cGxvYWRVcmxcbiAgICogQHBhcmFtIGZpbGUgVGhlIGZpbGVcbiAgICovXG4gIHVwbG9hZEltYWdlKGZpbGU6IEZpbGUpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxVcGxvYWRSZXNwb25zZT4+IHtcblxuICAgIGNvbnN0IHVwbG9hZERhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICB1cGxvYWREYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VXBsb2FkUmVzcG9uc2U+KHRoaXMudXBsb2FkVXJsLCB1cGxvYWREYXRhLCB7XG4gICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgIG9ic2VydmU6ICdldmVudHMnLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBpbWFnZSB3aXRoIFVybFxuICAgKiBAcGFyYW0gaW1hZ2VVcmwgVGhlIGltYWdlVXJsLlxuICAgKi9cbiAgaW5zZXJ0SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdpbnNlcnRJbWFnZScsIGZhbHNlLCBpbWFnZVVybCk7XG4gIH1cblxuICBzZXREZWZhdWx0UGFyYWdyYXBoU2VwYXJhdG9yKHNlcGFyYXRvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoJ2RlZmF1bHRQYXJhZ3JhcGhTZXBhcmF0b3InLCBmYWxzZSwgc2VwYXJhdG9yKTtcbiAgfVxuXG4gIGNyZWF0ZUN1c3RvbUNsYXNzKGN1c3RvbUNsYXNzOiBDdXN0b21DbGFzcykge1xuICAgIGxldCBuZXdUYWcgPSB0aGlzLnNlbGVjdGVkVGV4dDtcbiAgICBpZiAoY3VzdG9tQ2xhc3MpIHtcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBjdXN0b21DbGFzcy50YWcgPyBjdXN0b21DbGFzcy50YWcgOiAnc3Bhbic7XG4gICAgICBuZXdUYWcgPSAnPCcgKyB0YWdOYW1lICsgJyBjbGFzcz1cIicgKyBjdXN0b21DbGFzcy5jbGFzcyArICdcIj4nICsgdGhpcy5zZWxlY3RlZFRleHQgKyAnPC8nICsgdGFnTmFtZSArICc+JztcbiAgICB9XG4gICAgdGhpcy5pbnNlcnRIdG1sKG5ld1RhZyk7XG4gIH1cblxuICBpbnNlcnRWaWRlbyh2aWRlb1VybDogc3RyaW5nKSB7XG4gICAgaWYgKHZpZGVvVXJsLm1hdGNoKCd3d3cueW91dHViZS5jb20nKSkge1xuICAgICAgdGhpcy5pbnNlcnRZb3VUdWJlVmlkZW9UYWcodmlkZW9VcmwpO1xuICAgIH1cbiAgICBpZiAodmlkZW9VcmwubWF0Y2goJ3ZpbWVvLmNvbScpKSB7XG4gICAgICB0aGlzLmluc2VydFZpbWVvVmlkZW9UYWcodmlkZW9VcmwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0WW91VHViZVZpZGVvVGFnKHZpZGVvVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpZCA9IHZpZGVvVXJsLnNwbGl0KCd2PScpWzFdO1xuICAgIGNvbnN0IGltYWdlVXJsID0gYGh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpLyR7aWR9LzAuanBnYDtcbiAgICBjb25zdCB0aHVtYm5haWwgPSBgXG4gICAgICA8ZGl2IHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmUnPlxuICAgICAgICA8aW1nIHN0eWxlPSdwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6MjAwcHg7IHRvcDoxNDBweCdcbiAgICAgICAgICAgICBzcmM9XCJodHRwczovL2ltZy5pY29uczguY29tL2NvbG9yLzk2LzAwMDAwMC95b3V0dWJlLXBsYXkucG5nXCIvPlxuICAgICAgICA8YSBocmVmPScke3ZpZGVvVXJsfScgdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgIDxpbWcgc3JjPVwiJHtpbWFnZVVybH1cIiBhbHQ9XCJjbGljayB0byB3YXRjaFwiLz5cbiAgICAgICAgPC9hPlxuICAgICAgPC9kaXY+YDtcbiAgICB0aGlzLmluc2VydEh0bWwodGh1bWJuYWlsKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0VmltZW9WaWRlb1RhZyh2aWRlb1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3ViID0gdGhpcy5odHRwLmdldDxhbnk+KGBodHRwczovL3ZpbWVvLmNvbS9hcGkvb2VtYmVkLmpzb24/dXJsPSR7dmlkZW9Vcmx9YCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgY29uc3QgaW1hZ2VVcmwgPSBkYXRhLnRodW1ibmFpbF91cmxfd2l0aF9wbGF5X2J1dHRvbjtcbiAgICAgIGNvbnN0IHRodW1ibmFpbCA9IGA8ZGl2PlxuICAgICAgICA8YSBocmVmPScke3ZpZGVvVXJsfScgdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgIDxpbWcgc3JjPVwiJHtpbWFnZVVybH1cIiBhbHQ9XCIke2RhdGEudGl0bGV9XCIvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5gO1xuICAgICAgdGhpcy5pbnNlcnRIdG1sKHRodW1ibmFpbCk7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5leHROb2RlKG5vZGUpIHtcbiAgICBpZiAobm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChub2RlICYmICFub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbiAgICB9XG4gIH1cblxuICBnZXRSYW5nZVNlbGVjdGVkTm9kZXMocmFuZ2UsIGluY2x1ZGVQYXJ0aWFsbHlTZWxlY3RlZENvbnRhaW5lcnMpIHtcbiAgICBsZXQgbm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICAgIGNvbnN0IGVuZE5vZGUgPSByYW5nZS5lbmRDb250YWluZXI7XG4gICAgbGV0IHJhbmdlTm9kZXMgPSBbXTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSByYW5nZSB0aGF0IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBzaW5nbGUgbm9kZVxuICAgIGlmIChub2RlID09PSBlbmROb2RlKSB7XG4gICAgICByYW5nZU5vZGVzID0gW25vZGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJdGVyYXRlIG5vZGVzIHVudGlsIHdlIGhpdCB0aGUgZW5kIGNvbnRhaW5lclxuICAgICAgd2hpbGUgKG5vZGUgJiYgbm9kZSAhPT0gZW5kTm9kZSkge1xuICAgICAgICByYW5nZU5vZGVzLnB1c2goIG5vZGUgPSB0aGlzLm5leHROb2RlKG5vZGUpICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBwYXJ0aWFsbHkgc2VsZWN0ZWQgbm9kZXMgYXQgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZVxuICAgICAgbm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICAgICAgd2hpbGUgKG5vZGUgJiYgbm9kZSAhPT0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIpIHtcbiAgICAgICAgcmFuZ2VOb2Rlcy51bnNoaWZ0KG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBhbmNlc3RvcnMgb2YgdGhlIHJhbmdlIGNvbnRhaW5lciwgaWYgcmVxdWlyZWRcbiAgICBpZiAoaW5jbHVkZVBhcnRpYWxseVNlbGVjdGVkQ29udGFpbmVycykge1xuICAgICAgbm9kZSA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgcmFuZ2VOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByYW5nZU5vZGVzO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWROb2RlcygpIHtcbiAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgIGlmICh0aGlzLmRvYy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbC5yYW5nZUNvdW50OyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgbm9kZXMucHVzaC5hcHBseShub2RlcywgdGhpcy5nZXRSYW5nZVNlbGVjdGVkTm9kZXMoc2VsLmdldFJhbmdlQXQoaSksIHRydWUpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgcmVwbGFjZVdpdGhPd25DaGlsZHJlbihlbCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gICAgd2hpbGUgKGVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShlbC5maXJzdENoaWxkLCBlbCk7XG4gICAgfVxuICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gIH1cblxuICByZW1vdmVTZWxlY3RlZEVsZW1lbnRzKHRhZ05hbWVzKSB7XG4gICAgY29uc3QgdGFnTmFtZXNBcnJheSA9IHRhZ05hbWVzLnRvTG93ZXJDYXNlKCkuc3BsaXQoJywnKTtcbiAgICB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgICB0YWdOYW1lc0FycmF5LmluZGV4T2Yobm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBub2RlIGFuZCByZXBsYWNlIGl0IHdpdGggaXRzIGNoaWxkcmVuXG4gICAgICAgIHRoaXMucmVwbGFjZVdpdGhPd25DaGlsZHJlbihub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19