<md-content>
    <table class="table table-bordered table-striped">
        <caption></caption>
        <thead>
            <tr >
                <td ng-repeat="head in info.header">{{head}}</td>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="(key,body) in info.body track by $index">
                <td ng-repeat="(k,item) in body track by $index">{{item}}</td>
            </tr>
        </tbody>
    </table>
</md-content>