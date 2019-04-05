/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * 'License'); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
//        this.saveData('test', '0')
        this.refreshList()
    },
    
    retrieveData: function() {
        if (localStorage.getItem('items') !== null) {
            
            for (let i=0; i<JSON.parse(localStorage.getItem('items')).length; i++) {
                
                let title = document.createElement('span')
                title.innerHTML = JSON.parse(localStorage.getItem('items'))[i][0]
                title.setAttribute('class', 'title')
                
                let date = document.createElement('span')
                date.innerHTML = JSON.parse(localStorage.getItem('items'))[i][1]
                date.setAttribute('class', 'date')
                
                let item = document.createElement('div')
                item.setAttribute('class', 'item')
                item.appendChild(title)
                item.appendChild(date)
                document.getElementById('items').appendChild(item)
            }
        }
    },
    
    saveData: function(title, date) {
        let items = []
        const item = [title, date]
        
        if (localStorage.getItem('items') !== null) {
            items = JSON.parse(localStorage.getItem('items'))
        }
        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
    },
    
    removeData: function(item) {
        localStorage.removeItem(item)
    },
    
    refreshList: function() {
        const items = document.getElementById('items')
        while (items.firstChild) {
            items.removeChild(items.firstChild)
        }
        this.retrieveData()
    }
};

app.initialize();
