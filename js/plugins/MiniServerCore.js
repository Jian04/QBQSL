//=============================================================================
// RPG Maker MV/MZ - MiniServerCore
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 开启本地服务器时提供移动端使用电脑端存档的功能.
 * @author 江枫眠
 *
 * @help MiniServerCore.js
 *
 * 引用即可,支持MV/MZ,可自己修改内容
 */
(function () {
  "use strict";

  var MiniServerCore = {};

  function __isNwjs() {
    return typeof require === "function" && typeof process === "object";
  }

  if (__isNwjs()) return;

  var _Text_Decoder = new TextDecoder();
  function loadGame_Server() {
    var xhr = new XMLHttpRequest();
    var url = "loadgame_server";
    xhr.open("GET", url);
    return new Promise(function (resolve, reject) {
      xhr.overrideMimeType("application/json");
      xhr.onload = function () {
        if (xhr.status < 400) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      };
      xhr.onerror = function (err) {
        reject(err);
        console.log("加载服务端存档失败", err);
      };
      xhr.send();
    });
  }

  if (Utils.RPGMAKER_NAME === "MV") {
    var maxSavefiles = DataManager.maxSavefiles();

    StorageManager.localFileDirectoryPath = function () {
      return "";
    };

    MiniServerCore.loadServerSaveMV = async function (data) {
      loadServerSave(data);
      DataManager.loadGlobalInfo();
    };

    function loadServerSave(data) {
      for (var i = -1; i <= maxSavefiles; i++) {
        var localFile = StorageManager.localFilePath(i);
        setLocalSave(i, localFile, data);
      }
    }

    function setLocalSave(i, localFile, data) {
      if (!!data[localFile]) {
        var saveContents = _Text_Decoder.decode(
          new Uint8Array(data[localFile])
        );
        var webStorageKey = StorageManager.webStorageKey(i);
        localStorage.setItem(webStorageKey, saveContents);
        console.log("读取'" + localFile + "'到'" + webStorageKey + "'成功!");
      }
    }
  }

  if (Utils.RPGMAKER_NAME === "MZ") {
    var maxSavefiles = DataManager.maxSavefiles();

    StorageManager.fileDirectoryPath = function () {
      return "";
    };

    MiniServerCore.loadServerSaveMZ = async function (data) {
      await loadServerSave(data);
      await DataManager.loadGlobalInfo();
      await _setWaitCount(2000);
    };

    async function loadServerSave(data) {
      var saveArr = ["global", "config"];
      for (var saveName of saveArr) {
        await setLocalSave(saveName, data);
      }

      for (var i = 0; i <= maxSavefiles; i++) {
        var saveName = DataManager.makeSavename(i);
        await setLocalSave(saveName, data);
      }
    }

    async function setLocalSave(saveName, data) {
      var localFile = StorageManager.filePath(saveName);
      if (!!data[localFile]) {
        var saveContents = _Text_Decoder.decode(
          new Uint8Array(data[localFile])
        );
        var webStorageKey = StorageManager.forageKey(saveName);
        await StorageManager.saveToForage(saveName, saveContents);
        console.log("读取'" + localFile + "'到'" + webStorageKey + "'成功!");
      }
    }

    function _setWaitCount(milliseconds) {
      return new Promise((resolve, _) => {
        var tempTimer = setTimeout(() => {
          clearTimeout(tempTimer);
          tempTimer = undefined;
          resolve(true);
        }, milliseconds);
      });
    }
  }

  var loadGameTimer = setInterval(function () {
    if (!!$dataSystem && typeof $dataSystem === "object") {
      clearInterval(loadGameTimer);
      confirm("使用电脑端当前存档?") &&
        loadGame_Server()
          .then(function (data) {
            MiniServerCore["loadServerSave" + Utils.RPGMAKER_NAME](data);
          })
          .then(function () {
            if (SceneManager._scene && SceneManager._scene._windowLayer) {
              for (var _window of SceneManager._scene._windowLayer.children) {
                _window.refresh && _window.refresh();
              }
            }
          })
          .catch(function (err) {
            console.warn(err);
          });
    }
  }, 100);
})();
