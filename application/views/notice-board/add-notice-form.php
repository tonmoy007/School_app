<md-dialog aria-label="Add Notice">
      <form ng-cloak name="addNoticeForm" novalidate="">
        <md-toolbar>
          <div class="md-toolbar-tools">
            <h2>নতুন নোটিশ যুক্ত করুন</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="cancel()">
              <md-icon md-svg-src="assets/img/cd-icon-close.svg" aria-label="Close dialog"></md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-dialog-content>
          <div class="md-dialog-content" layout="column">
              <md-input-container >
              <label>নোটিশ শিরোনাম</label>
                  <input type="text" ng-model="newNotice.title" required="true" name="title">
                  <div ng-messages="addNoticeForm.title.$error" role="alert">
                      <div ng-message="required">
                        নোটিশ শিরোনাম অবশ্যই দিতে হবে।।
                      </div>
                    </div>
              </md-input-container>
              <md-input-container class="file-container">
                  <div class="ImageUpload " ng-show="!newNotice.notice_file">
                              <span class="md-button md-raised file-upload-btn" type="button">নোটিশ ফাইল যুক্ত করুন</span>
                              <input type="file" aria-label="add New Notice" ngf-change="setFile($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event)" ngf-select ng-model="newNotice.notice_file" name="notice_file"    
                                 accept="all" ngf-max-size="2MB" required
                                 ngf-model-invalid="errorFile">
                    </div>

                          <i ng-show="addNoticeForm.notice_file.$error.maxSize">File too large 
                              {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
                          <div class="file-img-container" style="background-image: url({{thumb}});" ng-show="addNoticeForm.notice_file.$valid">
                       {{type.img}}   
                              <img ng-show="addNoticeForm.notice_file.$valid" class=" cool-shadow cool-border md-avater  file-image" ngf-no-object-url="true" ngf-src="newNotice.notice_file" > <md-icon  ng-click="cancelImg(newNotice.notice_file,file_name)" ng-show="newNotice.notice_file" class=" md-raised file-remove-icon right cool-shadow" md-svg-src="assets/img/accessories/cancel.svg" aria-label="Close dialog"></md-icon>
                          </div>
                    <div ng-messages="addNoticeForm.notice_file.$error" role="alert">
                      <div ng-message="required">
                        নোটিশ ফাইল অবশ্যই দিতে হবে।।
                      </div>
                    </div>
              </md-input-container>
              <span flex class="text-primary text-center">{{file_name}}</span>
          </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
          <div layout="row" layout-sm="column" layout-align="space-around">
              <md-progress-circular md-mode="determinate" value="{{file_uploading.progress}}"></md-progress-circular>
            </div>
          <span flex></span>
          <md-button ng-click="cancel()">
           Cancel
          </md-button>
          <md-button ng-click="answer(newNotice,addNoticeForm)">
            Add
          </md-button>
        </md-dialog-actions>
     </form>
 </md-dialog>