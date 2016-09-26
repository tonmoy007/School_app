<md-list>
    <md-list-item  class="md-2-line" ng-repeat="notice in notices track by $index">
        
        <md-list-item-text layout="column">
            <h4><span class="label label-primary">{{$index+1}}</span>&nbsp;{{notice.notice_title}}</h4>
            <p class="text-muted pad-l-6"><strong>Published :</strong> {{notice.created}}</p>
        </md-list-item-text>
        <span ng-if="notice.new" class="new-badge">
            <md-icon  md-svg-src="assets/img/accessories/new-badge.svg"></md-icon>
        </span>
        <span flex></span>
        <a href="{{notice.notice_file.dirname+'/'+notice.notice_file.basename}}" download="{{notice.notice_file.basename}}" target="_blank">
            <img ng-src="{{notice.notice_file.dirname+'/thumb/'+notice.notice_file.basename}}" ng-if="notice.notice_file&&notice.notice_file.extension!='pdf'" alt="" class="md-avatar no-circle">
            <img ng-src="assets/img/accessories/pdf-document-blue.svg" ng-if="notice.notice_file&&notice.notice_file.extension=='pdf'" alt="" class="md-avatar no-circle ">
            <md-tooltip md-direction="top" md-delay="800">
              ডাউনলোড করতে ক্লিক করুন
            </md-tooltip>
        </a>
        <md-divider ng-if="!$last"></md-divider>
    </md-list-item>
</md-list>