class Site {
// - `Site`는 n개 이상 생성 할 수 있다.
// - `Site`에는 `Board` 를 추가하고 추가된 `Board`를 조회할 수 있다.
// - 하나의 `Site`에 동일한 이름의 `Board`를 추가할 수 없다.
// - `Board`는 n개 이상 추가 할 수 있다.
    constructor() {
        this.boards = [];
    }

    addBoard(newboard) {
        if (this.boards.find((board) => board.name === newboard.name)) {
            throw new Error("하나의 `Site`에 동일한 이름의 `Board`를 추가할 수 없다.");
        }
        newboard.board_flag = true;
        this.boards.push(newboard);  
    }

    findBoardByName(newboard) {
        return this.boards.find((board) => board.name === newboard);
    }
}

class Board {

// - `Site` 에 추가된 `Board`만 사용 가능한 것으로 간주하며 사용 불가능한 `Board`에는 `Article`을 추가할 수 없다.
//     - 저장되는 형식은 `[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)`을 따른다. ([참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString))
// - `Article` 은 n개 이상 추가 할 수 있다.
// - 작성된 `Article` 목록을 조회 할 수 있어야 한다.

    // - `Board`는 `name` 데이터를 포함해야 하며 `null` 또는 빈 문자열(`''`)은 허용하지 않는다.
    constructor(boardName) {
        if(!boardName || boardName==='') {
            throw new Error("name은 데이터를 포함해야 합니다.");
        }
        this.articles = [];
        this.name = boardName;
        this.board_flag = false;
    }

    publish(article) {
        // - `Board`에 `Article`을 추가할 때 `Article`에 ID를 자동 생성해서 부여해야 한다.
         //     - 규칙은 `${board.name}-${랜덤 값}` 를 따른다.
        const random = Math.random()*100;
        article.id = `${this.name}-${random}`;

        // - `Board`에 `Article`을 추가할 때 `Article`에 작성 일자가 들어가야 한다.
        // console.log(new Date().toISOString());
        article.createdDate = new Date().toISOString();
        if (!this.board_flag) {
            throw new Error("site에 추가된 게시판에만 article 추가 가능합니다.");
        
        } 
        article.article_flag = true;
        this.articles.push(article);
        // console.log("board  내 article this", this.articles);
        
    }

    getAllArticles() {
        return this.articles;
    }

}

class Article {
    
    // - `Board`에 추가된 `Article`만 사용 가능한 것으로 간주하며 사용 불가능한 `Article`에는 `Comment`를 추가할 수 없다.
    
    // - `Comment`는 n개 이상 추가 할 수 있다.
    // - 작성된 `Comment` 목록을 조회 할 수 있어야 한다.
    constructor(article) {

        const {subject, content, author} = article;

        // - `Article`은 `subject`, `content`, `author` 3개의 데이터를 포함해야 하며 `null` 또는 빈 문자열(`''`)은 허용하지 않는다.
        if(!subject || subject==='' || !content || content===''|| !author || author==='') {
            throw new Error("데이터를 포함해야 합니다.");
        }

        this.comments = [];
        this.subject = subject;
        this.content = content;
        this.author = author;
        this.article_flag = false;
    }

    // - `Article`에 `Comment`를 추가할 때 `Comment`에 작성 일자가 들어가야 한다.
     //     - 저장되는 형식은 `[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)`을 따른다. ([참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString))
    reply(comment) {
        comment.createdDate = new Date().toISOString();

        if (!this.article_flag) {
            throw new Error("게시판에 추가된 기사만 댓글 반영 됩니다. ");  
        } 
        this.comments.push(comment);
    }

    getAllComments() {
        return this.comments;
    }
}

class Comment {
    // Comment는 content, author 2개의 데이터를 포함해야 하며 null 또는 빈 문자열('')은 허용하지 않는다.
    constructor(comment) {
        const {content, author} = comment;
        if(!content || content==='' || !author || author==='') {
            throw new Error("content, author은 데이터를 포함해야 합니다.")
        }
        this.content = content;
        this.author = author;
    }

}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
